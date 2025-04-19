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
            var competitions = await this.competitionsService.GetAll();
            return Ok(competitions);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateCompetitionViewModel model)
        {
            if (ModelState.IsValid)
            {
                Competition competition = ViewModelToEntity.CreateCompetitionFromViewModel(model);

                var existsAlready = await competitionsService.Exists(competition);
                if (existsAlready)
                {
                    return BadRequest($"Exists: the competition {model.Title} already exists");
                }

                var result = await competitionsService.Create(competition);
                return Ok(result);
            }

            return BadRequest();
        }
    }
}
