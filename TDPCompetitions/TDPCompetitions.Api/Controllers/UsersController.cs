using Microsoft.AspNetCore.Mvc;
using TDPCompetitions.Core.Interfaces.Managers;

namespace TDPCompetitions.Api.Controllers
{
    [ApiController]
    public class UsersController : ControllerBase
    {


        public UsersController(IProblemsManager problemsManager)
        {
        }

        
    }
}
