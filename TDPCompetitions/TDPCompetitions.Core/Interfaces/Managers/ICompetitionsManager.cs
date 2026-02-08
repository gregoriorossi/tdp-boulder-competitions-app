using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Core.Interfaces.Managers
{
    public interface ICompetitionsManager
    {
        Task<bool> CompetitionExists(Guid id, CancellationToken cancellationToken);
        Task<Competition> CreateAsync(Competition competition, CancellationToken cancellationToken);
        Task DeleteAsync(Competition competition, CancellationToken cancellationToken);
        Task<Competition?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
        Task<Competition?> GetBySlugAsync(string slug, CancellationToken cancellationToken);
        Task<bool> IsSlugAvailableAsync(Competition competition, CancellationToken cancellationToken);
        Task<Competition> UpdateAsync(Competition updateCompetition, CancellationToken cancellationToken);
    }
}
