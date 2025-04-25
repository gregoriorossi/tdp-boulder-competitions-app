using Microsoft.AspNetCore.Mvc;
using TDPCompetitionsAPI.Core.Entities;
using TDPCompetitionsAPI.Core.Interfaces.Services;
using TDPCompetitionsAPI.Web.Mappers;
using TDPCompetitionsAPI.Web.ViewModels;

namespace TDPCompetitionsAPI.Controllers
{
    [ApiController]
    // aggiungere controllo autenticazione
    [Route("[controller]")]
    public class AdminCompetitionsController : ControllerBase
    {
        private readonly ILogger<CompetitionsController> _logger;
        private readonly ICompetitionsService competitionsService;

        public AdminCompetitionsController(
            ILogger<CompetitionsController> logger,
            ICompetitionsService competitionsService)
        {
            _logger = logger;
            this.competitionsService = competitionsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var competitions = await competitionsService.GetAll();
            return Ok(competitions);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateCompetitionViewModel model)
        {
            if (ModelState.IsValid)
            {
                Competition competition = ViewModelToEntity.CreateCompetitionFromViewModel(model);

                var isSlugAvailable = await competitionsService.IsSlugAvailable(competition);
                if (!isSlugAvailable)
                {
                    return BadRequest($"Exists: the competition \"{model.Title}\" already exists");
                }

                var result = await competitionsService.Create(competition);
                return Ok(result);
            }

            return BadRequest();
        }

        [HttpPatch]
        public async Task<IActionResult> Update(UpdateCompetitionViewModel model)
        {
            if (ModelState.IsValid)
            {
                Competition competitionData = ViewModelToEntity.UpdateCompetitionFromViewModel(model);
                bool competitionExists = await competitionsService.Exists(competitionData.Id);

                if (!competitionExists)
                {
                    return BadRequest($"Exists: a competition with id \"{model.Id}\" does not exist");
                }

                var isSlugAvailable = await competitionsService.IsSlugAvailable(competitionData);
                if (!isSlugAvailable)
                {
                    return BadRequest($"Exists: a competition with title \"{model.Title}\" already exists");
                }

                var result = await competitionsService.Update(competitionData);
                return Ok(result);
            }

            return BadRequest();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(Guid id)
        {
            if (ModelState.IsValid)
            {
                Competition competition = await competitionsService.Get(id);
                await competitionsService.Delete(competition);
                return Ok();
            }

            return BadRequest();
        }
    }
}
