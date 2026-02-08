using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TDPCompetitions.Core.Interfaces.Repositories;
using TDPCompetitions.Infrastracture.Data;

namespace TDPCompetitions.Infrastracture.Repositories
{
    public class FilesRepository : IFilesRepository
    {
        private readonly AppDbContext _appDbContext;

        public FilesRepository(AppDbContext appDbContext)
        {

            _appDbContext = appDbContext;
        }

        public async Task<ICollection<Core.Entities.File>> GetAllAsync(Expression<Func<Core.Entities.File, bool>> where, CancellationToken cancellationToken)
        {
            return await _appDbContext.Files.Where(where).ToListAsync(cancellationToken);
        }
    }
}
