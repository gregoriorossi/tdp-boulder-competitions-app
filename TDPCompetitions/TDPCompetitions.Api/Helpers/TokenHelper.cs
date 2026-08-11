using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace TDPCompetitions.Api.Helpers;

public static class TokenHelper
{
    public static JwtSecurityToken? CreateToken(string username, string securityKey, string issuer, string role)
    {
        var claims = new Claim[] {
            new Claim(ClaimTypes.Name, username),
            new Claim(ClaimTypes.Role, role)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));
        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: issuer,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(30),
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
        );

        return token;
    }

    public static JwtSecurityToken? DecodeToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();

        if (!tokenHandler.CanReadToken(token))
        {
            return null;
        }

        var jwt = tokenHandler.ReadJwtToken(token);
        return jwt;
    }
}
