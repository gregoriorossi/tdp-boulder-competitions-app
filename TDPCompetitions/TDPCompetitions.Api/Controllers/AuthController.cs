using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using TDPCompetitions.Api.Helpers;
using TDPCompetitions.Api.ViewModels;
using TDPCompetitions.Api.ViewModels.Auth.Requests;
using TDPCompetitions.Api.ViewModels.Auth.Responses;
using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Interfaces.Repositories;
using TDPCompetitions.Core.Interfaces.Managers;

using JWTConsts = TDPCompetitions.Api.Constants.Config.JWT;
using TDPCompetitions.Core.Errors;

namespace TDPCompetitions.Api.Controllers
{
    [ApiController]
    [Route(Constants.DefaultApiRoute)]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUsersRepository _usersRepository;
        private readonly ICompetitionsManager _competitionsManager;

        public AuthController(
            IUsersRepository usersRepository,
            IConfiguration configuration,
            ICompetitionsManager competitionsManager)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            _usersRepository = usersRepository ?? throw new ArgumentNullException(nameof(usersRepository));
            _competitionsManager = competitionsManager ?? throw new ArgumentNullException(nameof(competitionsManager));
        }

        [HttpPost]
        [Route("editor/login")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<EditorLoginResponse>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> EditorLogin(EditorLoginRequest model, CancellationToken cancellationToken)
        {
            User? user = await _usersRepository.Get(model.Username, cancellationToken);
            if (user == null || !PasswordHasher.Verify(model.Password, user.PasswordHash))
            {
                return Unauthorized();
            }

            var token = TokenHelper.CreateToken(user.Username, _configuration[JWTConsts.Key]!, _configuration[JWTConsts.Issuer]!, Constants.Roles.EDITOR);
            string tokenStr = new JwtSecurityTokenHandler().WriteToken(token);
            return Ok(Result<EditorLoginResponse>.Success(
                new EditorLoginResponse(
                    user, 
                    tokenStr, 
                    DateTime.UtcNow.AddHours(1), 
                    new[] { Constants.Roles.EDITOR }
                )));
        }

        [HttpPost]
        [Route("competitor/login")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<CompetitorLoginResponse>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CompetitorLogin(CompetitorLoginRequest model, CancellationToken cancellationToken)
        {
            var registration = await _competitionsManager.GetRegistrationByEmailAsync(model.CompetitionId, model.Email, cancellationToken);
            if (registration is null)
            {
                return Ok(Result.Failure(RegistrationsErrors.NotRegistered));
            }

            var token = TokenHelper.CreateToken(registration.Email, _configuration[JWTConsts.Key]!, _configuration[JWTConsts.Issuer]!, Constants.Roles.COMPETITOR);
            string tokenStr = new JwtSecurityTokenHandler().WriteToken(token);
            return Ok(Result<CompetitorLoginResponse>.Success(
                new CompetitorLoginResponse(
                    registration,
                    tokenStr,
                    DateTime.UtcNow.AddHours(1),
                    new[] { Constants.Roles.COMPETITOR }
                )));
        }
    }
}
