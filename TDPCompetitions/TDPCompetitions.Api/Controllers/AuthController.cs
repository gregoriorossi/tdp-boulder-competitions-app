using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using TDPCompetitions.Api.Helpers;
using TDPCompetitions.Api.ViewModels;
using TDPCompetitions.Api.ViewModels.Auth.Requests;
using TDPCompetitions.Api.ViewModels.Auth.Responses;
using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Interfaces.Repositories;

using JWTConsts = TDPCompetitions.Api.Constants.Config.JWT;

namespace TDPCompetitions.Api.Controllers
{
    [ApiController]
    [Route(Constants.DefaultApiRoute)]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUsersRepository _usersRepository;

        public AuthController(
            IUsersRepository usersRepository,
            IConfiguration configuration)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            _usersRepository = usersRepository ?? throw new ArgumentNullException(nameof(usersRepository));
        }

        [HttpPost]
        [Route("editor/login")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<LoginResponse>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Login(EditorLoginRequest model, CancellationToken cancellationToken)
        {
            User? user = await _usersRepository.Get(model.Username, cancellationToken);
            if (user == null || !PasswordHasher.Verify(model.Password, user.PasswordHash))
            {
                return Unauthorized();
            }

            var token = TokenHelper.CreateToken(user.Username, _configuration[JWTConsts.Key]!, _configuration[JWTConsts.Issuer]!, Constants.Roles.EDITOR);
            string tokenStr = new JwtSecurityTokenHandler().WriteToken(token);
            return Ok(Result<LoginResponse>.Success(
                new LoginResponse(
                    user, 
                    tokenStr, 
                    DateTime.UtcNow.AddHours(1), 
                    new[] { Constants.Roles.EDITOR }
                )));
        }
    }
}
