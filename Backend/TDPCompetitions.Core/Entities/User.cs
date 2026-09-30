namespace TDPCompetitions.Core.Entities;

public class User : BaseEntity<Guid>
{
    public required string Username { get; set; } 
    public required string PasswordHash { get; set; }
}
