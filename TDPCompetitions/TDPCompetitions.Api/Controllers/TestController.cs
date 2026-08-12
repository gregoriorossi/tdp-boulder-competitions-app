using Microsoft.AspNetCore.Mvc;
using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Enums;
using TDPCompetitions.Core.Interfaces.Managers;
using TDPCompetitions.Core.Interfaces.Services;
using TDPCompetitions.Core.Models;

namespace TDPCompetitions.Api.Controllers
{
    [ApiController]
    [Route(Constants.DefaultApiRoute)]
    public class TestController : ControllerBase
    {
        private readonly ICompetitionsManager _competitionsManager;
        private readonly IEmailService _emailService;

        public TestController(
             ICompetitionsManager competitionsManager,
             IEmailService emailService)
        {
            _competitionsManager = competitionsManager ?? throw new ArgumentNullException(nameof(competitionsManager));
            _emailService = emailService ?? throw new ArgumentNullException(nameof(emailService));
        }

        [HttpGet]
        [Route("confirmationEmail")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> TestEmail(CancellationToken cancellationToken)
        {
            Competition? competition = await _competitionsManager.GetByIdAsync(Guid.Parse("8d2a0f1b-bd3f-4bb0-9f4b-6d2f1a6c0b99"), cancellationToken);

            Registration? registration = await _competitionsManager.GetRegistrationByIdAsync(Guid.Parse("a9f8b2a1-6a84-4d3e-9c9e-1a7d2e1c0a11"), cancellationToken);

            await _emailService.SendEmailAsync(new EmailMessageSettings(competition!, registration!, EmailTemplate.REGISTRATION_CONFIRMATION), cancellationToken);
            return NoContent();
        }
    }
}
