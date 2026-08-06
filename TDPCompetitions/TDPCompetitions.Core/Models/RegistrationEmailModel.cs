namespace TDPCompetitions.Core.Models;

public class RegistrationEmailModel
{
    public required string CompetitionTitle { get; init; }
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public required string Email { get; init; }
    public required string RegistrationDate { get; init; }
    public required string Message { get; init; }
}
