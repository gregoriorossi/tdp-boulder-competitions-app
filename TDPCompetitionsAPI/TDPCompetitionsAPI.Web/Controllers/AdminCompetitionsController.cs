using Microsoft.AspNetCore.Mvc;
using TDPCompetitionsAPI.Core.Entities;

namespace TDPCompetitionsAPI.Controllers
{
    [ApiController]
    // aggiungere controllo autenticazione
    [Route("[controller]")]
    public class AdminCompetitionsController : ControllerBase
    {
        private readonly ILogger<CompetitionsController> _logger;

        public AdminCompetitionsController(ILogger<CompetitionsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var competitions = new List<Competition>();
            return Ok(competitions);
        }

        [HttpPost]
        public IActionResult Create()
        {
            return Ok();
        }
    }
}
