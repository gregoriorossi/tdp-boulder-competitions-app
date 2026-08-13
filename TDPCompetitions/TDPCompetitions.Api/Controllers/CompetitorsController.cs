using Azure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TDPCompetitions.Api.Extensions;
using TDPCompetitions.Api.Helpers;
using TDPCompetitions.Api.Mappers;
using TDPCompetitions.Api.ViewModels;
using TDPCompetitions.Api.ViewModels.Competitors;
using TDPCompetitions.Api.ViewModels.Competitors.Requests;
using TDPCompetitions.Api.ViewModels.Competitors.Requests.AddRegistration;
using TDPCompetitions.Api.ViewModels.Competitors.Responses;
using TDPCompetitions.Api.ViewModels.Competitors.Responses.GetCompetitionAndRegistrationDataBySlug;
using TDPCompetitions.Api.ViewModels.Competitors.Responses.GetProblemsResponse;
using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Enums;
using TDPCompetitions.Core.Errors;
using TDPCompetitions.Core.Interfaces.Managers;
using TDPCompetitions.Core.Interfaces.Services;
using TDPCompetitions.Core.Models;

namespace TDPCompetitions.Api.Controllers
{
    [ApiController]
    [Route(Constants.DefaultApiRoute)]
    public class CompetitorsController : ControllerBase
    {
        private readonly IProblemsManager _problemsManager;
        private readonly ICompetitionsManager _competitionsManager;
        private readonly IEmailService _emailService;

        public CompetitorsController(
            IProblemsManager problemsManager,
            ICompetitionsManager competitionsManager,
            IEmailService emailService)
        {
            _problemsManager = problemsManager ?? throw new ArgumentNullException(nameof(problemsManager));
            _competitionsManager = competitionsManager ?? throw new ArgumentNullException(nameof(competitionsManager));
            _emailService = emailService ?? throw new ArgumentNullException(nameof(emailService));
        }

        [HttpGet]
        [Route("competitions")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<Result<IEnumerable<GetCompetitionsResponse>>>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCompetitions(CancellationToken cancellationToken)
        {
            var competitions = await _competitionsManager.GetAllCompetitionsAsync(cancellationToken);

            var result = competitions
                .Where(c => c.Status == CompetitionStatus.OPEN || c.Status == CompetitionStatus.CLOSED)
                .OrderByDescending(c => c.Date)
                .Select(c => new GetCompetitionsResponse(c));

            return Ok(Result<IEnumerable<GetCompetitionsResponse>>.Success(result));
        }

        [HttpPost]
        [Route("register/{competitionId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddRegistration(Guid competitionId, [FromBody] AddRegistrationRequest model, CancellationToken cancellationToken)
        {
            Competition? competition = await _competitionsManager.GetByIdAsync(competitionId, cancellationToken);
            if (competition == null)
            {
                return NotFound(Result<Registration>.Failure(CompetitionsErrors.NotFound));
            }

            if (!competition.RegistrationsOpen)
            {
                return Ok(Result<Registration>.Failure(CompetitionsErrors.NotOpen));
            }

            bool isAlreadyRegistered = await _competitionsManager.IsCompetitorRegisteredAsync(model.Email, competitionId, cancellationToken);
            if (isAlreadyRegistered)
            {
                return Ok(Result<Registration>.Failure(RegistrationsErrors.AlreadyRegistered));
            }

            Registration registration = ViewModelToEntity.AddRegistrationRequestToRegistration(model, competitionId);
            Registration result = await _competitionsManager.AddRegistrationAsync(registration, cancellationToken);

            await _emailService.SendEmailAsync(new EmailMessageSettings(competition, registration, EmailTemplate.REGISTRATION_CONFIRMATION), cancellationToken);
            return NoContent();
        }

        [HttpGet]
        [Route("competitions/getBySlug/{slug}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<CompetitionInfoResponse>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCompetitionBySlug(string slug, CancellationToken cancellationToken)
        {
            Competition? competition = await _competitionsManager.GetBySlugAsync(slug, cancellationToken);

            if (competition is null)
            {
                return NotFound(Result<CompetitionInfoResponse>.Failure(CompetitionsErrors.NotFound));
            }

            return Ok(Result<CompetitionInfoResponse>.Success(new CompetitionInfoResponse(competition)));
        }

        [HttpGet]
        [Route("competitions/getBySlug/{slug}/registration")]
        [Authorize(Roles = Constants.Roles.COMPETITOR)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<GetCompetitionAndRegistrationDataBySlugResponse>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCompetitionAndRegistrationDataBySlug(string slug, CancellationToken cancellationToken)
        {
            Competition? competition = await _competitionsManager.GetBySlugAsync(slug, cancellationToken);

            if (competition is null)
            {
                return NotFound(Result<CompetitionInfoResponse>.Failure(CompetitionsErrors.NotFound));
            }

            string email = GetUsernameFromJwtToken() ?? throw new UnauthorizedAccessException("Username not found in JWT token.");
            Registration? registration = await _competitionsManager.GetRegistrationByEmailAsync(competition.Id, email, cancellationToken);
            if (registration is null)
            {
                return NotFound(Result<RegistrationResponse>.Failure(CompetitionsErrors.NotFound));
            }

            if (!registration.IsRegistrationOwner(email))
            {
                return Unauthorized();
            }

            var response = new GetCompetitionAndRegistrationDataBySlugResponse(
                new RegistrationResponse(registration),
                new CompetitionInfoResponse(competition));

            return Ok(Result<GetCompetitionAndRegistrationDataBySlugResponse>.Success(response));
        }

        [HttpGet]
        [Authorize(Roles = Constants.Roles.COMPETITOR)]
        [Route("competitions/{competitionId}/rankings")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<ICollection<RankingCompetitorResponse>>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetRankings(Guid competitionId, [FromQuery] string? gender, CancellationToken cancellationToken)
        {
            Gender? genderFilter = null;
            if (!gender?.TryParseGender(out genderFilter) ?? false)
            {
                return BadRequest(Result<ICollection<RankingCompetitor>>.Failure(CompetitionsErrors.GenderNotExists));
            }

            Competition? competition = await _competitionsManager.GetByIdAsync(competitionId, cancellationToken);
            if (competition == null)
            {
                return NotFound(Result<ICollection<RankingCompetitor>>.Failure(CompetitionsErrors.NotFound));
            }

            ICollection<RankingCompetitor> ranking = await _competitionsManager.GetRankingAsync(competitionId, genderFilter ?? Gender.ALL, cancellationToken);
            var response = ranking.Select(c => new RankingCompetitorResponse(c)).ToList();
            return Ok(Result<ICollection<RankingCompetitorResponse>>.Success(response));
        }

        [HttpGet]
        [Authorize(Roles = Constants.Roles.COMPETITOR)]
        [Route("competitions/{competitionId}/problems")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<GetProblemsResponse>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetProblems(Guid competitionId, CancellationToken cancellationToken)
        {
            bool competitionExists = await _competitionsManager.CompetitionExists(competitionId, cancellationToken);
            if (!competitionExists)
            {
                return NotFound(Result.Failure(CompetitionsErrors.NotFound));
            }

            var groupsProblems = await _problemsManager.GetProblemsGroupsByCompetitionIdAsync(competitionId, cancellationToken);
            var specialProblems = await _problemsManager.GetSpecialProblemsByCompetitionIdAsync(competitionId, cancellationToken);
            var response = new GetProblemsResponse(groupsProblems, specialProblems);
            return Ok(Result<GetProblemsResponse>.Success(response));
        }



        [HttpGet]
        [Authorize(Roles = Constants.Roles.COMPETITOR)]
        [Route("competitions/{competitionId}/problems/competitors/{competitorId}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<GetSentProblemsResponse>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetSentProblems(Guid competitionId, Guid competitorId, CancellationToken cancellationToken)
        {
            bool competitionExists = await _competitionsManager.CompetitionExists(competitionId, cancellationToken);
            if (!competitionExists)
            {
                return NotFound(Result.Failure(CompetitionsErrors.NotFound));
            }

            bool canRead = await CanRead(competitionId, competitorId, cancellationToken);
            if (!canRead)
            {
                return Unauthorized();
            }

            IEnumerable<SentProblem> sentProblems = await _problemsManager.GetSentProblemsByCompetitorIdAsync(competitionId, competitorId, cancellationToken);
            IEnumerable<SentSpecialProblem> sentSpecialProblems = await _problemsManager.GetSentSpecialProblemsByCompetitorIdAsync(competitionId, competitorId, cancellationToken);

            var response = new GetSentProblemsResponse(
                sentProblems.Select(p => new SentProblemResponse(p)).ToList(),
                sentSpecialProblems.Select(p => new SentSpecialProblemResponse(p))
                .ToList());
            return Ok(Result<GetSentProblemsResponse>.Success(response));
        }

        [HttpPost]
        [Authorize(Roles = Constants.Roles.COMPETITOR)]
        [Route("competitions/{competitionId}/problems/{problemId}/send")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<SentProblemResponse>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> SendProblem(Guid competitionId, Guid problemId, [FromBody] SendProblemRequest model, CancellationToken cancellationToken)
        {
            string username = GetUsernameFromJwtToken() ?? throw new UnauthorizedAccessException("Username not found in JWT token.");
            Result? canSend = await CanSend(competitionId, username, model.CompetitorId, cancellationToken);

            if (canSend != null)
            {
                return Ok(canSend);
            }

            SentProblem send = new SentProblem(competitionId, model.CompetitorId, problemId, DateTime.UtcNow);
            SentProblem result = await _problemsManager.SendProblemAsync(send, cancellationToken);

            var response = new SentProblemResponse(result);
            return Ok(Result<SentProblemResponse>.Success(response));
        }

        [HttpDelete]
        [Authorize(Roles = Constants.Roles.COMPETITOR)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("competitions/{competitionId}/problems/sends/{sentProblemId}")]
        public async Task<IActionResult> RemoveSentProblem(Guid competitionId, Guid sentProblemId, CancellationToken cancellationToken)
        {
            SentProblem? sentProblem = await _problemsManager.GetSentProblemByIdAsync(sentProblemId, cancellationToken);
            if (sentProblem is null)
            {
                return NotFound(Result.Failure(SentProblemsErrors.NotFound));
            }

            string username = GetUsernameFromJwtToken() ?? throw new UnauthorizedAccessException("Username not found in JWT token.");
            Result? canSend = await CanSend(competitionId, username, sentProblem.CompetitorId, cancellationToken);

            if (canSend != null)
            {
                return Ok(canSend);
            }


            await _problemsManager.DeleteSentProblemAsync(sentProblem, cancellationToken);
            return Ok(Result.Success());
        }

        [HttpPost]
        [Authorize(Roles = Constants.Roles.COMPETITOR)]
        [Route("competitions/{competitionId}/specialProblems/{specialProblemId}/send")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<SentProblemResponse>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> SendSpecialProblem(Guid competitionId, Guid specialProblemId, [FromBody] SendSpecialProblemRequest model, CancellationToken cancellationToken)
        {
            string username = GetUsernameFromJwtToken() ?? throw new UnauthorizedAccessException("Username not found in JWT token.");
            Result? canSend = await CanSend(competitionId, username, model.CompetitorId, cancellationToken);

            if (canSend != null)
            {
                return Ok(canSend);
            }

            SentSpecialProblem send = new SentSpecialProblem(competitionId, model.CompetitorId, specialProblemId, DateTime.UtcNow);
            SentSpecialProblem result = await _problemsManager.SendSpecialProblemAsync(send, cancellationToken);

            var response = new SentSpecialProblemResponse(result);
            return Ok(Result<SentSpecialProblemResponse>.Success(response));
        }

        [HttpDelete]
        [Authorize(Roles = Constants.Roles.COMPETITOR)]
        [Route("competitions/{competitionId}/specialProblems/sends/{sentSpecialProblemId}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> RemoveSentSpecialProblem(Guid competitionId, Guid sentSpecialProblemId, CancellationToken cancellationToken)
        {
            SentSpecialProblem? sentSpecialProblem = await _problemsManager.GetSentSpecialProblemByIdAsync(sentSpecialProblemId, cancellationToken);
            if (sentSpecialProblem is null)
            {
                return NotFound(Result.Failure(SentSpecialProblemsErrors.NotFound));
            }

            string username = GetUsernameFromJwtToken() ?? throw new UnauthorizedAccessException("Username not found in JWT token.");
            Result? canSend = await CanSend(competitionId, username, sentSpecialProblem.CompetitorId, cancellationToken);

            if (canSend != null)
            {
                return Ok(canSend);
            }


            await _problemsManager.DeleteSentSpecialProblemAsync(sentSpecialProblem, cancellationToken);
            return Ok(Result.Success());
        }

        [HttpDelete]
        [Authorize(Roles = Constants.Roles.COMPETITOR)]
        [Route("competitions/{competitionId}/registrations/{registrationId}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteRegistration(Guid competitionId, Guid registrationId, CancellationToken cancellationToken)
        {
            bool competitionExists = await _competitionsManager.CompetitionExists(competitionId, cancellationToken);
            if (!competitionExists)
            {
                return NotFound(Result.Failure(CompetitionsErrors.NotFound));
            }

            Registration? registration = await _competitionsManager.GetRegistrationByIdAsync(registrationId, cancellationToken);
            if (registration is null)
            {
                return NotFound(Result.Failure(RegistrationsErrors.NotFound));
            }

            string username = GetUsernameFromJwtToken() ?? throw new UnauthorizedAccessException("Username not found in JWT token.");
            if (!registration.IsRegistrationOwner(username))
            {
                return Unauthorized();
            }

            await _competitionsManager.DeleteRegistrationAsync(registration, cancellationToken);
            return Ok(Result.Success());
        }

        [HttpPatch]
        [Route("register/{competitorId}")]
        public async Task<IActionResult> UpdateCompetitor(Guid competitorId, [FromBody] UpdateCompetitorVM model, CancellationToken cancellationToken)
        {
            Competitor? competitor = await _competitionsManager.GetCompetitorAsync(competitorId, cancellationToken);
            if (competitor == null)
            {
                return Ok(Result<Registration>.Failure(RegistrationsErrors.NotRegistered));
            }

            // controllo se un competitor è maggiorenne non può diventare minorenne e viceversa

            Competitor competitorUpdated = ViewModelToEntity.UpdateCompetitorVMToCompetitor(competitorId, model);
            Competitor result = await _competitionsManager.UpdateCompetitorAsync(competitorUpdated, cancellationToken);
            return Ok(Result<Competitor>.Success(result));
        }

        private async Task<Result?> CanSend(Guid competitionId, string email, Guid competitorId, CancellationToken cancellationToken)
        {
            Competition? competition = await _competitionsManager.GetByIdAsync(competitionId, cancellationToken);
            if (competition == null)
            {
                return Result<Competition>.Failure(CompetitionsErrors.NotFound);
            }

            if (competition.Status != CompetitionStatus.OPEN)
            {
                return Result<Competition>.Failure(CompetitionsErrors.NotOpen);
            }

            Registration? registration = await _competitionsManager.GetRegistrationByEmailAsync(competitionId, email, cancellationToken);
            if (registration is null)
            {
                return Result<Competition>.Failure(RegistrationsErrors.NotRegistered);
            }

            var isMinor = registration.Minors.Any(m => m.Id == competitorId);
            if (registration.CompetitorId != competitorId && !isMinor)
            {
                return Result<Competition>.Failure(RegistrationsErrors.NotRegistered);
            }

            return null;
        }

        private async Task<bool> CanRead(Guid competitionId, Guid competitorId, CancellationToken cancellationToken)
        {
            string email = GetUsernameFromJwtToken() ?? throw new UnauthorizedAccessException("Username not found in JWT token.");
            Registration? registration = await _competitionsManager.GetRegistrationByEmailAsync(competitionId, email, cancellationToken);
            if (registration is null)
            {
                return false;
            }

            if (!registration.IsRegistrationOwner(email))
            {
                return false;
            }
            return true;
        }

        private string? GetUsernameFromJwtToken()
        {
            var authorizationHeader = Request.Headers.Authorization.FirstOrDefault();
            var jwt = TokenHelper.DecodeToken(authorizationHeader?.Replace("Bearer ", "") ?? "");
            var username = jwt?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;

            return username;
        }
    }
}
