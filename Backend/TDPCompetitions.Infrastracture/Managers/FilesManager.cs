using System.Linq.Expressions;
using TDPCompetitions.Core.Interfaces.Managers;
using TDPCompetitions.Core.Interfaces.Repositories;

namespace TDPCompetitions.Infrastracture.Managers
{
    public class FilesManager : IFilesManager
    {
        private readonly IFilesRepository _filesRepository;

        public FilesManager(IFilesRepository filesRepository)
        {
            _filesRepository = filesRepository;
        }

        public async Task<Core.Entities.File?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            Expression<Func<Core.Entities.File, bool>> whereFn = (f) => f.Id == id; 
            var result = await _filesRepository.GetAllAsync(whereFn, cancellationToken);
            return result.FirstOrDefault();
        }
    }
}
