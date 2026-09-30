namespace TDPCompetitions.Api.ViewModels.Auth.Responses;

public sealed record UserInfo(
    Guid Id,
    string Username,
    string[] Roles)
{
    public UserInfo(Core.Entities.User user, string[] roles)
        : this(
            user.Id,
            user.Username,
            roles)
    { }
}
