using Microsoft.AspNetCore.Mvc;
using TDPCompetitionsAPI.Core.Entities;

namespace TDPCompetitionsAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CompetitionsController : ControllerBase
    {
        private readonly ILogger<CompetitionsController> _logger;

        public CompetitionsController(ILogger<CompetitionsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var competitions = new List<Competition>();
            return Ok(competitions);
        }
    }
}
