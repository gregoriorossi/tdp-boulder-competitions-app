namespace TDPCompetitions.Api.ViewModels.Auth.Requests;

public sealed record class CompetitorLoginRequest
{
    public required string Email { get; set; }

    public required Guid CompetitionId { get; set; }
}
