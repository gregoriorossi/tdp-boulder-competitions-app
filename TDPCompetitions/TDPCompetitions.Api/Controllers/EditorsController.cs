using Microsoft.AspNetCore.Mvc;
using TDPCompetitions.Api.Extensions;
using TDPCompetitions.Api.Mappers;
using TDPCompetitions.Api.ViewModels;
using TDPCompetitions.Api.ViewModels.Editors;
using TDPCompetitions.Core.Entities;
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
        [Route("competition/getById/{id}")]
        public async Task<IActionResult> GetCompetitionById(Guid id, CancellationToken cancellationToken)
        {
            Competition? competition = await _competitionsManager.GetByIdAsync(id, cancellationToken);
            var result = competition == null
                ? Result<Competition>.Failure(CompetitionsErrors.NotFound)
                : Result<Competition>.Success(competition);

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

            var status = model.Status.IntToStatus();
            if (status == null)
            {
                return BadRequest();
            }

            Competition? competition = await _competitionsManager.GetByIdAsync(model.CompetitionId, cancellationToken);
            if (competition == null)
            {
                return Ok(Result<Competition>.Failure(CompetitionsErrors.NotFound));
            }

            await _competitionsManager.UpdateCompetitionStatusAsync(status, cancellationToken);
            return Ok();
        }

        [HttpPatch]
        [Route("competition/update")]
        public async Task<IActionResult> UpdateCompetition([FromBody] UpdateCompetitionVM model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            Competition updateCompetition = await ViewModelToEntity.UpdateCompetitionVMToCompetitionAsync(model);
            bool competitionExists = await _competitionsManager.CompetitionExists(updateCompetition.Id, cancellationToken);
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
            return Ok(Result<Competition>.Success(result));
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

            var result = await _problemsManager.GetByCompetitionIdAsync(competitionId, cancellationToken);
            return base.Ok(Result<ICollection<ProblemsGroup>>.Success(result));
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
            ProblemsGroup result = await _problemsManager.AddProblemGroupAsync(group, cancellationToken);
            return base.Ok(Result<ProblemsGroup>.Success(result));
        }

        [HttpPatch]
        [Route("problems/updateGroup")]
        public async Task<IActionResult> UpdateProblemsGroup([FromBody] UpdateProblemsGroupVM model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            ProblemsGroup group = ViewModelToEntity.UpdateProblemGroupVMToProblemGroup(model);
            ProblemsGroup? exists = await _problemsManager.GetProblemGroupByIdAsync(group.Id, cancellationToken);
            if (exists == null)
            {
                return Ok(Result<ProblemsGroup>.Failure(ProblemsGroupErrors.NotFound));
            }

            ProblemsGroup result = await _problemsManager.UpdateProblemsGroupAsync(group, cancellationToken);
            return Ok(Result<ProblemsGroup>.Success(result));

        }

        [HttpDelete]
        [Route("problems/deleteGroup/{id}")]
        public async Task<IActionResult> DeleteProblemGroup(Guid id, CancellationToken cancellationToken)
        {
            ProblemsGroup? group = await _problemsManager.GetProblemGroupByIdAsync(id, cancellationToken);
            if (group == null)
            {
                return Ok(Result<ProblemsGroup>.Failure(ProblemsGroupErrors.NotFound));
            }

            await _problemsManager.DeleteProblemGroupAsync(id, cancellationToken);
            return Ok(Result<bool>.Success(true));
        }

        [HttpPost]
        [Route("problems/addToGroup")]
        public async Task<IActionResult> AddProblemsToGroup([FromBody] AddProblemsToGroupVM model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            ProblemsGroup? group = await _problemsManager.GetProblemGroupByIdAsync(model.GroupId, cancellationToken);
            if (group == null)
            {
                return Ok(Result<ProblemsGroup>.Failure(ProblemsGroupErrors.NotFound));
            }

            ICollection<Problem> problems = ViewModelToEntity.AddProblemsToGroupVMToProblems(model, group.CompetitionId); ;
            ICollection<Problem> result = await _problemsManager.AddProblemsToGroupAsync(problems, cancellationToken);
            return Ok(Result<ICollection<Problem>>.Success(result));
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
            var result = await _problemsManager.UpdateProblem(problem, cancellationToken);
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
    }
}
