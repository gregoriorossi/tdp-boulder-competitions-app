using TDPCompetitions.Core.Entities;
namespace TDPCompetitions.Api.ViewModels.Auth.Responses;

public sealed record EditorLoginResponse(
    string Token,
    DateTime ExpirationDate,
    UserInfo userInfo
    )
{
    public EditorLoginResponse(
        User user, 
        string token, 
        DateTime expirationDate,
        string[] roles)
        : this(
            token,
            expirationDate,
            new UserInfo(user.Id, user.Username, roles)
            )
    { }
}
