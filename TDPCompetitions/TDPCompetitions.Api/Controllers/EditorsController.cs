using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TDPCompetitions.Api.Extensions;
using TDPCompetitions.Api.Mappers;
using TDPCompetitions.Api.ViewModels;
using TDPCompetitions.Api.ViewModels.Competitors.Requests.AddRegistration;
using TDPCompetitions.Api.ViewModels.Editors.Requests;
using TDPCompetitions.Api.ViewModels.Editors.Responses;
using TDPCompetitions.Api.ViewModels.Editors.Responses.GetResultsResponse;
using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Enums;
using TDPCompetitions.Core.Errors;
using TDPCompetitions.Core.Interfaces.Managers;
using TDPCompetitions.Core.Interfaces.Services;
using TDPCompetitions.Core.Models;

namespace TDPCompetitions.Api.Controllers
{
    [Authorize(Roles = Constants.Roles.EDITOR)]
    [ApiController]
    [Route(Constants.DefaultApiRoute)]
    public class EditorsController : ControllerBase
    {
        private readonly ICompetitionsManager _competitionsManager;
        private readonly IProblemsManager _problemsManager;
        private readonly IExportService _exportService;

        public EditorsController(
            ICompetitionsManager competitionsManager,
            IProblemsManager problemsManager,
            IExportService exportService)
        {
            _competitionsManager = competitionsManager;
            _problemsManager = problemsManager;
            _exportService = exportService;
        }

        #region Competitions
        [HttpGet]
        [Route("competitions")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<ICollection<GetAllCompetitionsResponse>>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllCompetitions(CancellationToken cancellationToken)
        {
            ICollection<Competition> competitions = await _competitionsManager.GetAllCompetitionsAsync(cancellationToken);
            ICollection<GetAllCompetitionsResponse> competitionsResponse = competitions
                .Select(c => new GetAllCompetitionsResponse(c))
                .OrderByDescending(c => c.Date)
                .ToList();
            return Ok(Result<ICollection<GetAllCompetitionsResponse>>.Success(competitionsResponse));
        }

        [HttpGet]
        [Route("competitions/getById/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<ICollection<GetAllCompetitionsResponse>>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCompetitionById(Guid id, CancellationToken cancellationToken)
        {
            Competition? competition = await _competitionsManager.GetByIdAsync(id, cancellationToken);

            if (competition == null)
            {
                return NotFound(Result.Failure(CompetitionsErrors.NotFound));
            }

            var response = new CompetitionInfoResponse(competition);
            return Ok(Result<CompetitionInfoResponse>.Success(response));
        }

        [HttpPost]
        [Route("competitions")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<AddCompetitionResponse>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddCompetition(AddCompetitionRequest model, CancellationToken cancellationToken)
        {
            Competition competition = ViewModelToEntity.AddCompetitionVMToCompetition(model);
            bool isSlugAvailable = await _competitionsManager.IsSlugAvailableAsync(competition, cancellationToken);
            if (!isSlugAvailable)
            {
                return Ok(Result.Failure(CompetitionsErrors.SlugNotAvailable));
            }

            Competition result = await _competitionsManager.AddAsync(competition, cancellationToken);
            AddCompetitionResponse response = new AddCompetitionResponse(result);
            return Ok(Result<AddCompetitionResponse>.Success(response));
        }

        [HttpPatch]
        [Route("competitions/{competitionId}/status")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateCompetitionStatus(Guid competitionId, [FromBody] UpdateCompetitionStatusRequest model, CancellationToken cancellationToken)
        {
            CompetitionStatus? status = model.Status.IntToStatus();
            if (status == null)
            {
                return BadRequest();
            }

            Competition? competition = await _competitionsManager.GetByIdAsync(competitionId, cancellationToken);
            if (competition == null)
            {
                return NotFound();
            }

            await _competitionsManager.UpdateCompetitionStatusAsync(competitionId, (CompetitionStatus)status, cancellationToken);
            return NoContent();
        }

        [HttpPatch]
        [Route("competitions/{competitionId}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<CompetitionInfoResponse>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateCompetition(Guid competitionId, [FromForm] UpdateCompetitionRequest model, CancellationToken cancellationToken)
        {
            Competition updateCompetition = await ViewModelToEntity.UpdateCompetitionRequesetToCompetitionAsync(model);
            bool competitionExists = await _competitionsManager.CompetitionExists(competitionId, cancellationToken);
            if (!competitionExists)
            {
                return NotFound(Result.Failure(CompetitionsErrors.NotFound));
            }

            bool isSlugAvailable = await _competitionsManager.IsSlugAvailableAsync(updateCompetition, cancellationToken);
            if (!isSlugAvailable)
            {
                return Ok(Result.Failure(CompetitionsErrors.SlugNotAvailable));
            }

            Competition result = await _competitionsManager.UpdateAsync(updateCompetition, cancellationToken);
            return Ok(Result<CompetitionInfoResponse>.Success(new CompetitionInfoResponse(result)));
        }

        [HttpDelete]
        [Route("competitions/{competitionId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteCompetition(Guid competitionId, CancellationToken cancellationToken)
        {
            Competition? competition = await _competitionsManager.GetByIdAsync(competitionId, cancellationToken);
            if (competition == null)
            {
                return NotFound();
            }

            await _competitionsManager.DeleteAsync(competition, cancellationToken);
            return NoContent();
        }

        [HttpGet]
        [Route("competitions/{competitionId}/registrations")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<ICollection<RegistrationResponse>>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetRegistrations(Guid competitionId, CancellationToken cancellationToken)
        {
            bool competitionExists = await _competitionsManager.CompetitionExists(competitionId, cancellationToken);
            if (!competitionExists)
            {
                return NotFound(Result<ICollection<RegistrationResponse>>.Failure(CompetitionsErrors.NotFound));
            }

            var registrations = await _competitionsManager.GetRegistrationsAsync(competitionId, cancellationToken);
            return Ok(Result<ICollection<RegistrationResponse>>.Success(registrations.Select(r => new RegistrationResponse(r)).ToList()));
        }
        #endregion

        [HttpGet]
        [Route("competitions/{competitionId}/report")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(FileContentResult))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GenerateReport(Guid competitionId, CancellationToken cancellationToken)
        {
            Competition? competition = await _competitionsManager.GetByIdAsync(competitionId, cancellationToken);
            if (competition == null)
            {
                return NotFound(Result.Failure(CompetitionsErrors.NotFound));
            }

            var registrations = await _competitionsManager.GetRegistrationsAsync(competitionId, cancellationToken);

            var stream = _exportService.CreateCompetitorsReport(registrations);

            if (stream == null) {
                return StatusCode(500); 
            }

            string timestamp = DateTime.Now.ToString(Constants.DATE_TIME_FILE_EXPORT_FORMAT);
            return File(
                stream.ToArray(),
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                $"{competition.Slug}_{timestamp}.xlsx");
        }

        [HttpGet]
        [Route("competitions/{competitionId}/waiver")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(FileContentResult))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GenerateWaiverAll(Guid competitionId, CancellationToken cancellationToken)
        {
            Competition? competition = await _competitionsManager.GetByIdAsync(competitionId, cancellationToken);
            if (competition == null)
            {
                return NotFound(Result.Failure(CompetitionsErrors.NotFound));
            }

            var registrations = await _competitionsManager.GetRegistrationsAsync(competitionId, cancellationToken);

            var result = _exportService.CreateWaiver(registrations, competition);

            string timestamp = DateTime.Now.ToString(Constants.DATE_TIME_FILE_EXPORT_FORMAT);
            return File(
                result,
               "application/pdf",
                $"Delibere_{competition.Slug}_{timestamp}.pdf");
        }

        [HttpGet]
        [Route("competitions/{competitionId}/waiver/{registrationId}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(FileContentResult))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GenerateWaiver(Guid competitionId, Guid registrationId, CancellationToken cancellationToken)
        {
            Competition? competition = await _competitionsManager.GetByIdAsync(competitionId, cancellationToken);
            Registration? registration = await _competitionsManager.GetRegistrationByIdAsync(registrationId, cancellationToken);

            if (competition == null)
            {
                return NotFound(Result.Failure(CompetitionsErrors.NotFound));
            }

            if (registration == null)
            {
                return NotFound(Result.Failure(RegistrationsErrors.NotFound));
            }

            var result = _exportService.CreateWaiver(new List<Registration> {registration}, competition);

            string timestamp = DateTime.Now.ToString(Constants.DATE_TIME_FILE_EXPORT_FORMAT);
            return File(
                result,
               "application/pdf",
                $"Delibera_{registration.Competitor.LastName}_{registration.Competitor.FirstName}_{competition.Slug}_{timestamp}.pdf");
        }

        [HttpGet]
        [Route("competitions/{competitionId}/rankings")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<ICollection<RankingCompetitorResponse>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetRanking(Guid competitionId, [FromQuery] string? gender, CancellationToken cancellationToken)
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
        [Route("competitions/{competitionId}/rankingsreport")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(FileContentResult))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GenerateRankingReport(Guid competitionId, [FromQuery] string? gender, CancellationToken cancellationToken)
        {
            Gender? genderFilter = null;
            if (!gender?.TryParseGender(out genderFilter) ?? false)
            {
                return BadRequest(Result<ICollection<RankingCompetitor>>.Failure(CompetitionsErrors.GenderNotExists));
            }

            Competition? competition = await _competitionsManager.GetByIdAsync(competitionId, cancellationToken);
            if (competition == null)
            {
                return NotFound(Result.Failure(CompetitionsErrors.NotFound));
            }

            ICollection<RankingCompetitor> ranking = await _competitionsManager.GetRankingAsync(competitionId, genderFilter ?? Gender.ALL, cancellationToken);

            var stream = _exportService.CreateRankingReport(ranking);

            if (stream == null)
            {
                return StatusCode(500);
            }

            string timestamp = DateTime.Now.ToString(Constants.DATE_TIME_FILE_EXPORT_FORMAT);
            return File(
                stream.ToArray(),
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                $"Classifica_{competition.Slug}_{timestamp}.xlsx");
        }

        #region Problems
        [HttpGet]
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

        [HttpPatch]
        [Route("competitions/{competitionId}/problems/groups")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<ICollection<ProblemsGroupResponse>>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateProblemsGroups(Guid competitionId, UpdateProblemsGroupsRequest model, CancellationToken cancellationToken)
        { 
            bool competitionExists = await _competitionsManager.CompetitionExists(competitionId, cancellationToken);
            if (!competitionExists)
            {
                return NotFound(Result.Failure(CompetitionsErrors.NotFound));
            }

            ICollection<ProblemsGroup> groups = ViewModelToEntity
                .UpdateProblemGroupsVMToProblemGroups(model)
                .Where(g => g.CompetitionId == model.CompetitionId).ToList();

            ICollection<ProblemsGroup> result = await _problemsManager.UpdateProblemsGroupsAsync(groups, model.CompetitionId, cancellationToken);
            var response = result.Select(g => new ProblemsGroupResponse(g)).ToList();
            return Ok(Result<ICollection<ProblemsGroupResponse>>.Success(response));
        }

        [HttpPost]
        [Route("competitions/{competitionId}/problems")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<ProblemsGroup>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddProblemToGroup(Guid competitionId, AddProblemToGroupRequest model, CancellationToken cancellationToken)
        {
            bool competitionExists = await _competitionsManager.CompetitionExists(competitionId, cancellationToken);
            if (!competitionExists)
            {
                return NotFound(Result.Failure(CompetitionsErrors.NotFound));
            }

            ProblemsGroup? group = await _problemsManager.GetProblemsGroupByIdAsync(model.ProblemsGroupId, cancellationToken);
            if (group == null)
            {
                return NotFound(Result.Failure(ProblemsGroupErrors.NotFound));
            }

            Problem problem = ViewModelToEntity.AddProblemToGroupVMToProblem(model); ;
            Problem result = await _problemsManager.AddProblemToGroupAsync(problem, cancellationToken);
            return Ok(Result<AddProblemToGroupResponse>.Success(new AddProblemToGroupResponse(result)));
        }

        [HttpPatch]
        [Route("competitions/{competitionId}/problems")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<ProblemResponse>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateProblem(Guid competitionId, [FromBody] UpdateProblemRequest model, CancellationToken cancellationToken)
        {
            bool competitionExists = await _competitionsManager.CompetitionExists(competitionId, cancellationToken);
            if (!competitionExists)
            {
                return NotFound(Result.Failure(CompetitionsErrors.NotFound));
            }

            Problem? exists = await _problemsManager.GetProblemByIdAsync(model.Id, cancellationToken);
            if (exists == null)
            {
                return NotFound(Result.Failure(ProblemErrors.NotFound));
            }

            Problem problem = ViewModelToEntity.UpdateProblemVMToProblem(model);
            var result = await _problemsManager.UpdateProblemAsync(problem, cancellationToken);
            ProblemResponse response = new ProblemResponse(result);
            return Ok(Result<ProblemResponse>.Success(response));
        }

        [HttpDelete]
        [Route("competitions/{competitionId}/problems/{problemId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteProblemFromGroup(Guid competitionId, Guid problemId, CancellationToken cancellationToken)
        {
            bool competitionExists = await _competitionsManager.CompetitionExists(competitionId, cancellationToken);
            if (!competitionExists)
            {
                return NotFound(Result.Failure(CompetitionsErrors.NotFound));
            }

            Problem? problem = await _problemsManager.GetProblemByIdAsync(problemId, cancellationToken);
            if (problem == null)
            {
                return NotFound(Result.Failure(ProblemErrors.NotFound));
            }

            await _problemsManager.DeleteProblemFromGroup(problem, cancellationToken);
            return NoContent();
        }

        [HttpPost]
        [Route("competitions/{competitionId}/specialProblems")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<SpecialProblemResponse>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddSpecialProblem(Guid competitionId, [FromBody] AddSpecialProblemRequest model, CancellationToken cancellationToken)
        {
            bool competitionExists = await _competitionsManager.CompetitionExists(competitionId, cancellationToken);
            if (!competitionExists)
            {
                return NotFound(Result.Failure(CompetitionsErrors.NotFound));
            }

            SpecialProblem problem = ViewModelToEntity.AddSpecialProblemVMToSpecialProblem(model);
            var result = await _problemsManager.AddSpecialProblemAsync(problem, cancellationToken);
            return Ok(Result<SpecialProblemResponse>.Success(new SpecialProblemResponse(result)));
        }

        [HttpPatch]
        [Route("competitions/{competitionId}/specialProblems/{specialProblemId}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<SpecialProblemResponse>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateSpecialProblem(Guid competitionId, Guid specialProblemId, [FromBody] UpdateSpecialProblemRequest model, CancellationToken cancellationToken)
        {
            bool competitionExists = await _competitionsManager.CompetitionExists(competitionId, cancellationToken);
            if (!competitionExists)
            {
                return NotFound(Result.Failure(CompetitionsErrors.NotFound));
            }

            var problemResult = await _problemsManager.GetSpecialProblemByIdAsync(specialProblemId, cancellationToken);
            if (problemResult == null)
            {
                return NotFound(Result.Failure(SpecialProblemErrors.NotFound));
            }

            SpecialProblem problem = ViewModelToEntity.UpdateSpecialProblemVMToSpecialProblem(model);
            var result = await _problemsManager.UpdateSpecialProblemAsync(problem, cancellationToken);
            return Ok(Result<SpecialProblemResponse>.Success(new SpecialProblemResponse(result)));
        }

        [HttpDelete]
        [Route("competitions/{competitionId}/specialProblems/{specialProblemId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteSpecialProblem(Guid competitionId, Guid specialProblemId, CancellationToken cancellationToken)
        {
            bool competitionExists = await _competitionsManager.CompetitionExists(competitionId, cancellationToken);
            if (!competitionExists)
            {
                return NotFound(Result.Failure(CompetitionsErrors.NotFound));
            }

            SpecialProblem? problem = await _problemsManager.GetSpecialProblemByIdAsync(specialProblemId, cancellationToken);
            if (problem == null)
            {
                return NotFound(Result.Failure(SpecialProblemErrors.NotFound));
            }

            await _problemsManager.DeleteSpecialProblemAsync(problem, cancellationToken);
            return NoContent();
        }

        [HttpPost]
        [Route("competitions/{competitionId}/problems/{problemId}/send")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<SentProblemResponse>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> SendProblem(Guid competitionId, Guid problemId, [FromBody] SendProblemRequest model, CancellationToken cancellationToken)
        {
            bool competitionExists = await _competitionsManager.CompetitionExists(competitionId, cancellationToken);
            if (!competitionExists)
            {
                return NotFound(Result.Failure(CompetitionsErrors.NotFound));
            }

            SentProblem send = ViewModelToEntity.SendProblemRequestToSentProblem(competitionId, problemId, model);
            SentProblem result = await _problemsManager.SendProblemAsync(send, cancellationToken);
            var response = new SentProblemResponse(result);
            return Ok(Result<SentProblemResponse>.Success(response));
        }

        [HttpDelete]
        [Route("competitions/{competitionId}/problems/{problemId}/send/{sentProblemId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> RemoveSentProblem(Guid competitionId, Guid problemId, Guid sentProblemId, CancellationToken cancellationToken)
        {
            bool competitionExists = await _competitionsManager.CompetitionExists(competitionId, cancellationToken);
            if (!competitionExists)
            {
                return NotFound(Result.Failure(CompetitionsErrors.NotFound));
            }

            Problem? problem = await _problemsManager.GetProblemByIdAsync(problemId, cancellationToken);
            if (problem is null)
            {
                return NotFound(Result.Failure(ProblemErrors.NotFound));
            }

            SentProblem? sentProblem = await _problemsManager.GetSentProblemByIdAsync(sentProblemId, cancellationToken);
            if (sentProblem is null)
            {
                return NotFound(Result.Failure(SentProblemsErrors.NotFound));
            }

            await _problemsManager.DeleteSentProblemAsync(sentProblem, cancellationToken);
            return NoContent();
        }

        [HttpPost]
        [Route("competitions/{competitionId}/specialProblems/{specialProblemId}/send")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<SentSpecialProblemResponse>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> SendSpecialProblem(Guid competitionId, Guid specialProblemId, [FromBody] SendSpecialProblemRequest model, CancellationToken cancellationToken)
        {
            bool competitionExists = await _competitionsManager.CompetitionExists(competitionId, cancellationToken);
            if (!competitionExists)
            {
                return NotFound(Result.Failure(CompetitionsErrors.NotFound));
            }

            SentSpecialProblem send = ViewModelToEntity.SendSpecialProblemRequestToSentProblem(competitionId, specialProblemId, model);
            SentSpecialProblem result = await _problemsManager.SendSpecialProblemAsync(send, cancellationToken);
            var response = new SentSpecialProblemResponse(result);
            return Ok(Result<SentSpecialProblemResponse>.Success(response));
        }

        [HttpDelete]
        [Route("competitions/{competitionId}/specialProblems/{specialProblemId}/send/{sentSpecialProblemId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> RemoveSentSpecialProblem(Guid competitionId, Guid specialProblemId, Guid sentSpecialProblemId, CancellationToken cancellationToken)
        {
            bool competitionExists = await _competitionsManager.CompetitionExists(competitionId, cancellationToken);
            if (!competitionExists)
            {
                return NotFound(Result.Failure(CompetitionsErrors.NotFound));
            }

            SpecialProblem? specialProblem = await _problemsManager.GetSpecialProblemByIdAsync(specialProblemId, cancellationToken);
            if (specialProblem is null)
            {
                return NotFound(Result.Failure(ProblemErrors.NotFound));
            }

            SentSpecialProblem? sentSpecialProblem = await _problemsManager.GetSentSpecialProblemByIdAsync(sentSpecialProblemId, cancellationToken);
            if (sentSpecialProblem is null)
            {
                return NotFound(Result.Failure(SentSpecialProblemsErrors.NotFound));
            }

            await _problemsManager.DeleteSentSpecialProblemAsync(sentSpecialProblem, cancellationToken);
            return NoContent();
        }

        #endregion

        #region Competitors
        [HttpGet]
        [Route("competitions/{competitionId}/competitors")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<ICollection<CompetitorResponse>>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCompetitors(Guid competitionId, CancellationToken cancellationToken)
        {
            Competition? competition = await _competitionsManager.GetByIdAsync(competitionId, cancellationToken);
            if (competition == null)
            {
                return NotFound(Result.Failure(CompetitionsErrors.NotFound));
            }

            ICollection<Competitor> competitors = await _competitionsManager.GetCompetitorsAsync(competitionId, cancellationToken);
            ICollection<CompetitorResponse> response = competitors.Select(c => new CompetitorResponse(c)).ToList();

            return Ok(Result<ICollection<CompetitorResponse>>.Success(response));
        }

        #endregion

        #region Registrations
        [HttpPost]
        [Route("competitions/{competitionId}/registrations")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<RegistrationResponse>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddRegistration(Guid competitionId, [FromBody] AddRegistrationRequest model, CancellationToken cancellationToken)
        {
            Competition? competition = await _competitionsManager.GetByIdAsync(competitionId, cancellationToken);
            if (competition == null)
            {
                return NotFound(Result.Failure(CompetitionsErrors.NotFound));
            }

            bool isAlreadyRegistered = await _competitionsManager.IsCompetitorRegisteredAsync(model.Email, competitionId, cancellationToken);
            if (isAlreadyRegistered)
            {
                return Ok(Result.Failure(RegistrationsErrors.AlreadyRegistered));
            }

            Registration registration = ViewModelToEntity.AddRegistrationRequestToRegistration(model, competitionId);
            Registration result = await _competitionsManager.AddRegistrationAsync(registration, cancellationToken);

            return Ok(Result<RegistrationResponse>.Success(new RegistrationResponse(result)));
        }

        [HttpPatch]
        [Route("competitions/{competitionId}/registrations/{registrationId}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<RegistrationResponse>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateRegistration(Guid competitionId, Guid registrationId, [FromBody] UpdateRegistrationRequest model, CancellationToken cancellationToken)
        {
            Competition? competition = await _competitionsManager.GetByIdAsync(competitionId, cancellationToken);
            if (competition is null)
            {
                return NotFound(Result.Failure(CompetitionsErrors.NotFound));
            }

            Registration? registrationToUpdate = await _competitionsManager.GetRegistrationByIdAsync(registrationId, cancellationToken);
            if (registrationToUpdate is null)
            {
                return NotFound(Result.Failure(RegistrationsErrors.NotFound));
            }

            Registration registration = ViewModelToEntity.UpdateRegistrationRequestToRegistration(model, competitionId);
            Registration result = await _competitionsManager.UpdateRegistrationAsync(registration, registrationToUpdate, cancellationToken);

            return Ok(Result<RegistrationResponse>.Success(new RegistrationResponse(result)));
        }

        [HttpDelete]
        [Route("competitions/{competitionId}/registrations/{registrationId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteRegistration(Guid competitionId, Guid registrationId, CancellationToken cancellationToken)
        {
            Competition? competition = await _competitionsManager.GetByIdAsync(competitionId, cancellationToken);
            if (competition == null)
            {
                return NotFound(Result.Failure(CompetitionsErrors.NotFound));
            }

            Registration? registration = await _competitionsManager.GetRegistrationByIdAsync(registrationId, cancellationToken);
            if (registration == null)
            {
                return NotFound(Result.Failure(RegistrationsErrors.NotFound));
            }

            await _competitionsManager.DeleteRegistrationAsync(registration, cancellationToken);
            return NoContent();
        }

        [HttpPost]
        [Route("competitions/{competitionId}/registrations/{registrationId}/minors")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<CompetitorResponse>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddMinorToRegistration(Guid competitionId, Guid registrationId, [FromBody] AddMinorRequest model, CancellationToken cancellationToken)
        {
            Competition? competition = await _competitionsManager.GetByIdAsync(competitionId, cancellationToken);
            if (competition == null)
            {
                return NotFound(Result.Failure(CompetitionsErrors.NotFound));
            }

            Registration? registration = await _competitionsManager.GetRegistrationByIdAsync(registrationId, cancellationToken);
            if (registration is null)
            {
                return NotFound(Result.Failure(RegistrationsErrors.NotFound));
            }

            // controllo se il minor è già registrato per questa competizione

            Competitor minor = ViewModelToEntity.AddMinorRequestToCompetitor(model, competitionId, registration);

            Competitor result = await _competitionsManager.AddMinorToRegistrationAsync(minor, registration, cancellationToken);

            return Ok(Result<CompetitorResponse>.Success(new CompetitorResponse(result)));
        }

        [HttpPatch]
        [Route("competitions/{competitionId}/registrations/{registrationId}/minors/{minorId}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<CompetitorResponse>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateMinorToRegistration(Guid competitionId, Guid registrationId, Guid minorId, [FromBody] UpdateMinorRequest model, CancellationToken cancellationToken)
        {
            Competition? competition = await _competitionsManager.GetByIdAsync(competitionId, cancellationToken);
            if (competition == null)
            {
                return NotFound(Result.Failure(CompetitionsErrors.NotFound));
            }

            Registration? registration = await _competitionsManager.GetRegistrationByIdAsync(registrationId, cancellationToken);
            if (registration is null)
            {
                return NotFound(Result.Failure(RegistrationsErrors.NotFound));
            }

            Competitor? minorToUpdate = await _competitionsManager.GetCompetitorAsync(minorId, cancellationToken);

            if (minorToUpdate is null)
            {
                return NotFound(Result.Failure(CompetitorsErrors.NotFound));
            }

            Competitor minor = ViewModelToEntity.UpdateMinorRequestToCompetitor(model, competitionId, registration);

            Competitor result = await _competitionsManager.UpdateMinorToRegistrationAsync(minor, minorToUpdate, registration, cancellationToken);

            return Ok(Result<CompetitorResponse>.Success(new CompetitorResponse(result)));
        }

        [HttpDelete]
        [Route("competitions/{competitionId}/registrations/{registrationId}/minors/{minorId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteMinor(Guid competitionId, Guid registrationId, Guid minorId, CancellationToken cancellationToken)
        {
            Competition? competition = await _competitionsManager.GetByIdAsync(competitionId, cancellationToken);
            if (competition == null)
            {
                return NotFound(Result.Failure(CompetitionsErrors.NotFound));
            }

            Registration? registration = await _competitionsManager.GetRegistrationByIdAsync(registrationId, cancellationToken);
            if (registration == null)
            {
                return NotFound(Result.Failure(RegistrationsErrors.NotFound));
            }

            Competitor? competitor = await _competitionsManager.GetCompetitorAsync(minorId, cancellationToken);
            if (competitor == null)
            {
                return NotFound(Result.Failure(CompetitorsErrors.NotFound));
            }

            if (!competitor.IsMinor)
            {
                return BadRequest(Result.Failure(CompetitorsErrors.AdultDelete));
            }

            await _competitionsManager.DeleteCompetitorAsync(competitor, cancellationToken);
            return NoContent();
        }
        #endregion

        #region Results
        [HttpGet]
        [Route("competitions/{competitionId}/results")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<GetResultsResponse>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetResults(Guid competitionId, CancellationToken cancellationToken)
        {
            bool competitionExists = await _competitionsManager.CompetitionExists(competitionId, cancellationToken);
            if (!competitionExists)
            {
                return NotFound(Result.Failure(CompetitionsErrors.NotFound));
            }

            IEnumerable<Competitor> competitors = await _competitionsManager.GetCompetitorsAsync(competitionId, cancellationToken);
            var problemsGoups = await _problemsManager.GetProblemsGroupsByCompetitionIdAsync(competitionId, cancellationToken);
            var specialProblems = await _problemsManager.GetSpecialProblemsByCompetitionIdAsync(competitionId, cancellationToken);
            IEnumerable<SentProblem> sentProblems = await _problemsManager.GetSentProblemsByCompetitionIdAsync(competitionId, cancellationToken);
            IEnumerable<SentSpecialProblem> sentSpecialProblems = await _problemsManager.GetSentSpecialProblemsByCompetitionIdAsync(competitionId, cancellationToken);

            return Ok(Result<GetResultsResponse>.Success(new GetResultsResponse
            {
                Competitors = competitors.Select(c => new GetResultsCompetitionResponse(c, sentProblems, sentSpecialProblems)),
                ProblemsGroups = problemsGoups.Select(p => new ProblemsGroupResponse(p)),
                SpecialProblems = specialProblems.Select(sp => new GetResultsSpecialProblemResponse(sp, sentSpecialProblems, competitors)),
            }));
        }
        #endregion
    }
}
