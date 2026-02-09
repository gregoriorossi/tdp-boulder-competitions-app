using Microsoft.AspNetCore.Mvc;
using TDPCompetitions.Api.Mappers;
using TDPCompetitions.Api.ViewModels;
using TDPCompetitions.Api.ViewModels.Competitors;
using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Enums;
using TDPCompetitions.Core.Errors;
using TDPCompetitions.Core.Interfaces.Managers;

namespace TDPCompetitions.Api.Controllers
{
    [ApiController]
    public class CompetitorsController : ControllerBase
    {
        private readonly IProblemsManager _problemsManager;
        private readonly ICompetitionsManager _competitionsManager;

        public CompetitorsController(
            IProblemsManager problemsManager,
            ICompetitionsManager competitionsManager)
        {
            _problemsManager = problemsManager;
            _competitionsManager = competitionsManager;
        }

        [HttpPost]
        [Route("problems/send")]
        public async Task<IActionResult> SendProblem([FromBody] SendProblemVM model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            Result? canSend = await CanCompetitorSend(model.CompetitionId, model.CompetitorId, cancellationToken);
            if (canSend != null)
            {
                return Ok(canSend);
            }

            SentProblem send = ViewModelToEntity.SendProblemVMToSentProblem(model);
            SentProblem result = await _problemsManager.SendProblemAsync(send);
            return Ok(Result<SentProblem>.Success(result));
        }

        [HttpDelete]
        [Route("problems/send")]
        public async Task<IActionResult> RemoveSentProblem([FromBody] RemoveSentProblemVM model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            Result? canSend = await CanCompetitorSend(model.CompetitionId, model.CompetitorId, cancellationToken);
            if (canSend != null)
            {
                return Ok(canSend);
            }

            await _problemsManager.RemoveSentProblem(model.Id, cancellationToken);    
            return Ok();
        }

        [HttpPost]
        [Route("specialProblems/send")]
        public async Task<IActionResult> SendSpecialProblem([FromBody] SendSpecialProblemVM model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            Result? canSend = await CanCompetitorSend(model.CompetitionId, model.CompetitorId, cancellationToken);
            if (canSend != null)
            {
                return Ok(canSend);
            }

            SentSpecialProblem send = ViewModelToEntity.SendSpecialProblemVMToSentSpecialProblem(model);
            SentSpecialProblem result = await _problemsManager.SendSepcialProblemAsync(send);
            return Ok(Result<SentSpecialProblem>.Success(result));
        }

        [HttpDelete]
        [Route("specialProblems/send")]
        public async Task<IActionResult> RemoveSentSpecialProblem([FromBody] RemoveSentSpecialProblemVM model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            Result? canSend = await CanCompetitorSend(model.CompetitionId, model.CompetitorId, cancellationToken);
            if (canSend != null)
            {
                return Ok(canSend);
            }

            await _problemsManager.RemoveSentSpecialProblemAsync(model.Id, cancellationToken);
            return Ok();
        }

        private async Task<Result?> CanCompetitorSend(Guid competitionId, Guid competitorId, CancellationToken cancellationToken)
        {
            Competition? competition = await _competitionsManager.GetByIdAsync(competitorId, cancellationToken);
            if (competition == null)
            {
                return Result<Competition>.Failure(CompetitionsErrors.NotFound);
            }

            if (competition.Status != CompetitionStatus.OPEN)
            {
                return Result<Competition>.Failure(CompetitionsErrors.NotFound);
            }

            bool isRegistered = await _competitionsManager.IsCompetitorRegisteredAsync(competitorId, competitionId);
            if (!isRegistered)
            {
                return Result<Competition>.Failure(CompetitionsErrors.NotRegistered);
            }

            return null;
        }
    }
}
