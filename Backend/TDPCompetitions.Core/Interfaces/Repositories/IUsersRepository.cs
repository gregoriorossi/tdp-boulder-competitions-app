using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Core.Interfaces.Repositories;

public interface IUsersRepository
{
    Task<User?> Get(string username, CancellationToken cancellationToken);
}
