namespace TDPCompetitions.Api.ViewModels.Auth.Requests;

public sealed record EditorLoginRequest
{
    public required string Username { get; set; }

    public required string Password { get; set; }
}
