using Microsoft.AspNetCore.Mvc;
using TDPCompetitions.Api.Extensions;
using TDPCompetitions.Api.Mappers;
using TDPCompetitions.Api.ViewModels;
using TDPCompetitions.Api.ViewModels.Competitors;
using TDPCompetitions.Api.ViewModels.Editors;
using TDPCompetitions.Api.ViewModels.Editors.Requests;
using TDPCompetitions.Api.ViewModels.Editors.Responses;
using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Enums;
using TDPCompetitions.Core.Errors;
using TDPCompetitions.Core.Interfaces.Managers;
using TDPCompetitions.Core.Models;

namespace TDPCompetitions.Api.Controllers
{
    [ApiController]
    [Route(Constants.DefaultApiRoute)]
    public class EditorsController : ControllerBase
    {
        private readonly ICompetitionsManager _competitionsManager;
        private readonly IProblemsManager _problemsManager;

        public EditorsController(
            ICompetitionsManager competitionsManager,
            IProblemsManager problemsManager)
        {
            _competitionsManager = competitionsManager;
            _problemsManager = problemsManager;
        }

        #region Competitions
        [HttpGet]
        [Route("competition/all")]
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
        [Route("competition/getById/{id}")]
        public async Task<IActionResult> GetCompetitionById(Guid id, CancellationToken cancellationToken)
        {
            Competition? competition = await _competitionsManager.GetByIdAsync(id, cancellationToken);
            var result = competition == null
                ? Result<CompetitionInfoResponse>.Failure(CompetitionsErrors.NotFound)
                : Result<CompetitionInfoResponse>.Success(new CompetitionInfoResponse(competition));

            return Ok(result);
        }

        [HttpPost]
        [Route("competition/add")]
        public async Task<IActionResult> AddCompetition(AddCompetitionVM model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                BadRequest();
            }

            Competition competition = ViewModelToEntity.AddCompetitionVMToCompetition(model);
            bool isSlugAvailable = await _competitionsManager.IsSlugAvailableAsync(competition, cancellationToken);
            if (!isSlugAvailable)
            {
                return Ok(Result<Competition>.Failure(CompetitionsErrors.SlugNotAvailable));
            }

            Competition result = await _competitionsManager.AddAsync(competition, cancellationToken);
            return Ok(Result<Competition>.Success(result));
        }

        [HttpPatch]
        [Route("competition/updateStatus")]
        public async Task<IActionResult> UpdateCompetitionStatus([FromBody] UpdateCompetitionStatusVM model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            CompetitionStatus? status = model.Status.IntToStatus();
            if (status == null)
            {
                return BadRequest();
            }

            Competition? competition = await _competitionsManager.GetByIdAsync(model.CompetitionId, cancellationToken);
            if (competition == null)
            {
                return Ok(Result<Competition>.Failure(CompetitionsErrors.NotFound));
            }

            await _competitionsManager.UpdateCompetitionStatusAsync(model.CompetitionId, (CompetitionStatus) status , cancellationToken);
            return Ok();
        }

        [HttpPatch]
        [Route("competition/{id}")]
        public async Task<IActionResult> UpdateCompetition(Guid id, [FromForm] UpdateCompetitionVM model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            Competition updateCompetition = await ViewModelToEntity.UpdateCompetitionVMToCompetitionAsync(model);
            bool competitionExists = await _competitionsManager.CompetitionExists(id, cancellationToken);
            if (!competitionExists)
            {
                return Ok(Result<Competition>.Failure(CompetitionsErrors.NotFound));
            }

            bool isSlugAvailable = await _competitionsManager.IsSlugAvailableAsync(updateCompetition, cancellationToken);
            if (!isSlugAvailable)
            {
                return Ok(Result<Competition>.Failure(CompetitionsErrors.SlugNotAvailable));
            }

            Competition result = await _competitionsManager.UpdateAsync(updateCompetition, cancellationToken);
            return Ok(Result<CompetitionInfoResponse>.Success(new CompetitionInfoResponse(result)));
        }

        [HttpDelete]
        [Route("competition/delete/{id}")]
        public async Task<IActionResult> DeleteCompetition(Guid id, CancellationToken cancellationToken)
        {
            Competition? competition = await _competitionsManager.GetByIdAsync(id, cancellationToken);
            if (competition == null)
            {
                return Ok(Result<Competition>.Failure(CompetitionsErrors.NotFound));
            }

            await _competitionsManager.DeleteAsync(competition, cancellationToken);
            return Ok(Result<bool>.Success(true));
        }

        [HttpGet]
        [Route("competition/{id}/registrations")]
        public async Task<IActionResult> GetRegistrations(Guid id, CancellationToken cancellationToken)
        {
            bool competitionExists = await _competitionsManager.CompetitionExists(id, cancellationToken);
            if (!competitionExists)
            {
                return Ok(Result<Competition>.Failure(CompetitionsErrors.NotFound));
            }

            var registrations = await _competitionsManager.GetRegistrationsAsync(id, cancellationToken);
            return Ok(Result<ICollection<RegistrationVM>>.Success(registrations.Select(r => new RegistrationVM(r)).ToList()));
        }
        #endregion


        #region Problems
        [HttpGet]
        [Route("problems/get/{competitionId}")]
        public async Task<IActionResult> GetProblems(Guid competitionId, CancellationToken cancellationToken)
        {
            bool competitionExists = await _competitionsManager.CompetitionExists(competitionId, cancellationToken);
            if (!competitionExists)
            {
                return Ok(Result<Competition>.Failure(CompetitionsErrors.NotFound));
            }

            var groupsProblems = await _problemsManager.GetProblemsGroupsByCompetitionIdAsync(competitionId, cancellationToken);
            var specialProblems = await _problemsManager.GetSpecialProblemsByCompetitionIdAsync(competitionId, cancellationToken);
            var response = new GetProblemsResponse(groupsProblems, specialProblems);
            return Ok(Result<GetProblemsResponse>.Success(response));
        }

        [HttpPost]
        [Route("problems/addGroup")]
        public async Task<IActionResult> AddProblemGroup([FromBody] AddProblemsGroupVM model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            ProblemsGroup group = ViewModelToEntity.AddProblemGroupToProblemGroup(model);
            ProblemsGroup result = await _problemsManager.AddProblemsGroupAsync(group, cancellationToken);
            return base.Ok(Result<ProblemsGroup>.Success(result));
        }

        [HttpPatch]
        [Route("problems/groups")]
        public async Task<IActionResult> UpdateProblemsGroups(UpdateProblemsGroupsVM model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            bool competitionExists = await _competitionsManager.CompetitionExists(model.CompetitionId, cancellationToken);
            if (!competitionExists)
            {
                return Ok(Result<Competition>.Failure(CompetitionsErrors.NotFound));
            }

            ICollection<ProblemsGroup> groups = ViewModelToEntity
                .UpdateProblemGroupsVMToProblemGroups(model)
                .Where(g => g.CompetitionId == model.CompetitionId).ToList();
             
            ICollection<ProblemsGroup> result = await _problemsManager.UpdateProblemsGroupsAsync(groups, model.CompetitionId, cancellationToken);
            var response = result.Select(g => new ProblemsGroupVM(g)).ToList();
            return Ok(Result<ICollection<ProblemsGroupVM>>.Success(response));

        }

        [HttpPost]
        [Route("problems/addToGroup")]
        public async Task<IActionResult> AddProblemToGroup(AddProblemToGroupVM model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            ProblemsGroup? group = await _problemsManager.GetProblemsGroupByIdAsync(model.ProblemsGroupId, cancellationToken);
            if (group == null)
            {
                return Ok(Result<ProblemsGroup>.Failure(ProblemsGroupErrors.NotFound));
            }

            Problem problem = ViewModelToEntity.AddProblemToGroupVMToProblem(model); ;
            Problem result = await _problemsManager.AddProblemToGroupAsync(problem, cancellationToken);
            return Ok(Result<AddProblemToGroupResponse>.Success(new AddProblemToGroupResponse(result)));
        }

        [HttpPatch]
        [Route("problems/updateProblem")]
        public async Task<IActionResult> UpdateProblem([FromBody] UpdateProblemVM model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            Problem? exists = await _problemsManager.GetProblemByIdAsync(model.Id, cancellationToken);
            if (exists == null)
            {
                return Ok(Result<Problem>.Failure(ProblemErrors.NotFound));
            }

            Problem problem = ViewModelToEntity.UpdateProblemVMToProblem(model);
            var result = await _problemsManager.UpdateProblemAsync(problem, cancellationToken);
            return Ok(Result<Problem>.Success(result)); 
        }

        [HttpDelete]
        [Route("problems/deleteFromGroup/{id}")]
        public async Task<IActionResult> DeleteProblemFromGroup(Guid id, CancellationToken cancellationToken)
        {
            Problem? problem = await _problemsManager.GetProblemByIdAsync(id, cancellationToken);
            if (problem == null)
            {
                return Ok(Result<Problem>.Failure(ProblemErrors.NotFound));
            }

            await _problemsManager.DeleteProblemFromGroup(problem, cancellationToken);
            return Ok();
        }

        [HttpPost]
        [Route("problems/specialProblem")]
        public async Task<IActionResult> AddSpecialProblem([FromBody] AddSpecialProblemVM model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            bool competitionExists = await _competitionsManager.CompetitionExists(model.CompetitionId, cancellationToken);
            if (!competitionExists)
            {
                return Ok(Result<Competition>.Failure(CompetitionsErrors.NotFound));
            }

            SpecialProblem problem = ViewModelToEntity.AddSpecialProblemVMToSpecialProblem(model);
            var result = await _problemsManager.AddSpecialProblemAsync(problem, cancellationToken);
            return Ok(Result<SpecialProblemResponse>.Success(new SpecialProblemResponse(result)));
        }

        [HttpPatch]
        [Route("problems/specialProblem")]
        public async Task<IActionResult> UpdateSpecialProblem([FromBody] UpdateSpecialProblemVM model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            bool competitionExists = await _competitionsManager.CompetitionExists(model.CompetitionId, cancellationToken);
            if (!competitionExists)
            {
                return Ok(Result<Competition>.Failure(CompetitionsErrors.NotFound));
            }

            var problemResult = await _problemsManager.GetSpecialProblemByIdAsync(model.Id, cancellationToken);
            if (problemResult == null)
            {
                return Ok(Result<SpecialProblem>.Failure(SpecialProblemErrors.NotFound));
            }

            SpecialProblem problem = ViewModelToEntity.UpdateSpecialProblemVMToSpecialProblem(model);
            var result = await _problemsManager.UpdateSpecialProblemAsync(problem, cancellationToken);
            return Ok(Result<SpecialProblemResponse>.Success(new SpecialProblemResponse(result)));
        }

        [HttpDelete]
        [Route("problems/specialProblem/{id}")]
        public async Task<IActionResult> DeleteSpecialProblem(Guid id, CancellationToken cancellationToken)
        {
            SpecialProblem? problem = await _problemsManager.GetSpecialProblemByIdAsync(id, cancellationToken);
            if (problem == null)
            {
                return Ok(Result<SpecialProblem>.Failure(SpecialProblemErrors.NotFound));  
            }

            await _problemsManager.DeleteSpecialProblemAsync(problem, cancellationToken);
            return Ok(Result<SpecialProblem>.Success());
        }

        #endregion

        #region Competitors
        [HttpGet]
        [Route("competition/{competitionId}/rankings")]
        public async Task<IActionResult> GetRanking(Guid competitionId, CancellationToken cancellationToken)
        {
            Competition? competition = await _competitionsManager.GetByIdAsync(competitionId, cancellationToken);
            if (competition == null)
            {
                return Ok(Result<Competition>.Failure(CompetitionsErrors.NotFound));
            }

            ICollection<RankingCompetitor> ranking = await _competitionsManager.GetRankingAsync(competitionId, cancellationToken);
            return Ok(Result<ICollection<RankingCompetitor>>.Success(ranking));
        }

        [HttpGet]
        [Route("competition/{competitionId}/competitors")]
        public async Task<IActionResult> GetCompetitors(Guid competitionId, CancellationToken cancellationToken)
        {
            Competition? competition = await _competitionsManager.GetByIdAsync(competitionId, cancellationToken);
            if (competition == null)
            {
                return Ok(Result<Competition>.Failure(CompetitionsErrors.NotFound));
            }

            ICollection<Competitor> competitors = await _competitionsManager.GetCompetitorsAsync(competitionId, cancellationToken);
            return Ok(Result<ICollection<Competitor>>.Success(competitors));
        }

        #endregion

        #region Registrations
        [HttpPost]
        [Route("registrations/{competitionId}")]
        public async Task<IActionResult> AddRegistration(Guid competitionId, [FromBody] AddRegistrationVM model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Competition? competition = await _competitionsManager.GetByIdAsync(competitionId, cancellationToken);
            if (competition == null)
            {
                return Ok(Result<Registration>.Failure(CompetitionsErrors.NotFound));
            }

            bool isAlreadyRegistered = await _competitionsManager.IsCompetitorRegisteredAsync(model.Email, competitionId, cancellationToken);
            if (isAlreadyRegistered)
            {
                return Ok(Result<Registration>.Failure(RegistrationsErrors.AlreadyRegistered));
            }
            Registration registration = ViewModelToEntity.AddRegistrationVMToRegistration(model, competitionId);
            Registration result = await _competitionsManager.AddRegistrationAsync(registration, cancellationToken);

            return Ok(Result<RegistrationVM>.Success(new RegistrationVM(result)));
        }

        [HttpDelete]
        [Route("registrations/{id}")]
        public async Task<IActionResult> DeleteRegistration(Guid id, CancellationToken cancellationToken)
        {
            Registration? registration = await _competitionsManager.GetRegistrationAsync(id, cancellationToken);
            if (registration == null)
            {
                return Ok(Result<Registration>.Failure(RegistrationsErrors.NotFound));
            }

            await _competitionsManager.DeleteRegistrationAsync(registration, cancellationToken);
            return Ok(Result<bool>.Success(true));
        }

        [HttpDelete]
        [Route("registrations/competitor/{id}")]
        public async Task<IActionResult> DeleteCompetitor(Guid id, CancellationToken cancellationToken)
        {
            Competitor? competitor = await _competitionsManager.GetCompetitorAsync(id, cancellationToken);
            if (competitor == null)
            {
                return Ok(Result<Competitor>.Failure(CompetitorsErrors.NotFound));
            }
            
            if (!competitor.IsMinor)
            {
                return Ok(Result<Competitor>.Failure(CompetitorsErrors.AdultDelete));
            }

            await _competitionsManager.DeleteCompetitorAsync(competitor, cancellationToken);
            return Ok(Result<bool>.Success(true));
        }
        #endregion
    }
}
