namespace TDPCompetitions.Api.ViewModels.Auth.Responses;

public sealed record CompetitorInfo(
    string email,
    Guid competitionId,
    Guid registrationId,
    string[] Roles)
{
}
