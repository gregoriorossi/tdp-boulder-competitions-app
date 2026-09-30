namespace TDPCompetitions.Core.Interfaces.Managers
{
    public interface IFilesManager
    {
        public Task<Entities.File?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    }
}
