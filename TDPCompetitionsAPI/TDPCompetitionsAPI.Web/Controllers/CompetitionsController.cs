using Microsoft.AspNetCore.Mvc;
using TDPCompetitionsAPI.Core.Entities;
using TDPCompetitionsAPI.Core.Interfaces.Services;

namespace TDPCompetitionsAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CompetitionsController : ControllerBase
    {
        private readonly ILogger<CompetitionsController> _logger;
        private readonly ICompetitionsService competitionsService;

        public CompetitionsController(
            ILogger<CompetitionsController> logger,
            ICompetitionsService competitionsService)
        {
            _logger = logger;
            this.competitionsService = competitionsService;
        }

        
    }
}
