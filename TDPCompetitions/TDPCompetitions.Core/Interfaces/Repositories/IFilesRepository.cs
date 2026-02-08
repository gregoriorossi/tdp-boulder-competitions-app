using System.Linq.Expressions;

namespace TDPCompetitions.Core.Interfaces.Repositories
{
    public interface IFilesRepository
    {
        Task<ICollection<Entities.File>> GetAllAsync(Expression<Func<Entities.File, bool>> where, CancellationToken cancellationToken);
    }
}
