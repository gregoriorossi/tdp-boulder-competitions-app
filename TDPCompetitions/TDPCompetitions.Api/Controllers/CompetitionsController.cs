using Microsoft.AspNetCore.Mvc;
using TDPCompetitions.Api.Mappers;
using TDPCompetitions.Api.ViewModels;
using TDPCompetitions.Api.ViewModels.Competitions;
using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Errors;
using TDPCompetitions.Core.Interfaces.Managers;

namespace TDPCompetitions.Api.Controllers
{
    [ApiController]
    [Route(Constants.DefaultApiRoute)]
    public class CompetitionsController : ControllerBase
    {
        private readonly ICompetitionsManager _competitionsManager;

        public CompetitionsController(ICompetitionsManager competitionsManager)
        {
            _competitionsManager = competitionsManager;
        }


        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
        {
            Competition? competition = await _competitionsManager.GetByIdAsync(id, cancellationToken);
            var result = competition == null
                ? Result<Competition>.Failure(CompetitionsErrors.NotFound)
                : Result<Competition>.Success(competition);

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Add(AddCompetitionVM model, CancellationToken cancellationToken)
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

            Competition result = await _competitionsManager.CreateAsync(competition, cancellationToken);
            return Ok(Result<Competition>.Success(result));
        }

        [HttpPatch]
        public async Task<IActionResult> Update(UpdateCompetitionVM model, CancellationToken cancellationToken)
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
            if (!isSlugAvailable) {
                return Ok(Result<Competition>.Failure(CompetitionsErrors.SlugNotAvailable)); 
            }

            Competition resul = await _competitionsManager.UpdateAsync(updateCompetition, cancellationToken);   
            return Ok(Result<Competition>.Success(updateCompetition));
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
        {
            Competition? competition = await _competitionsManager.GetByIdAsync(id, cancellationToken);
            if (competition == null)
            {
                return Ok(Result<Competition>.Failure(CompetitionsErrors.NotFound));
            }

            await _competitionsManager.DeleteAsync(competition, cancellationToken);
            return Ok(Result<bool>.Success(true));
        }
    }
}
