using TDPCompetitions.Core.Entities;
namespace TDPCompetitions.Api.ViewModels.Auth.Responses;

public sealed record CompetitorLoginResponse(
    string Token,
    DateTime ExpirationDate,
    CompetitorInfo userInfo
    )
{
    public CompetitorLoginResponse(
        Registration registration,
        string token,
        DateTime expirationDate,
        string[] roles)
        : this(
            token,
            expirationDate,
            new CompetitorInfo(registration.Email, registration.CompetitionId, roles)
            )
    { }
}
