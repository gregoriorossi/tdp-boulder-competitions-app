using Microsoft.EntityFrameworkCore;
using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Interfaces.Repositories;
using TDPCompetitions.Infrastracture.Data;

namespace TDPCompetitions.Infrastracture.Repositories;

public class UsersRepository : IUsersRepository
{
    private readonly AppDbContext _appDbContext;

    public UsersRepository(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<User?> Get(string username, CancellationToken cancellationToken)
    {
        return await _appDbContext.Users
            .Where(u => u.Username.ToLower() == username.ToLower())
            .AsNoTracking()
            .FirstOrDefaultAsync();
    }
}
