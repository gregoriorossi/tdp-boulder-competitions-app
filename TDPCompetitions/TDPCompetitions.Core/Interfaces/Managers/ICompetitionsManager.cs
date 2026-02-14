using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Enums;
using TDPCompetitions.Core.Models;

namespace TDPCompetitions.Core.Interfaces.Managers
{
    public interface ICompetitionsManager
    {
        Task<bool> CompetitionExists(Guid id, CancellationToken cancellationToken);
        Task<Competition> AddAsync(Competition competition, CancellationToken cancellationToken);
        Task DeleteAsync(Competition competition, CancellationToken cancellationToken);
        Task<Competition?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
        Task<Competition?> GetBySlugAsync(string slug, CancellationToken cancellationToken);
        Task<bool> IsSlugAvailableAsync(Competition competition, CancellationToken cancellationToken);
        Task<Competition> UpdateAsync(Competition updateCompetition, CancellationToken cancellationToken);
        Task UpdateCompetitionStatusAsync(CompetitionStatus? status, CancellationToken cancellationToken);
        Task<bool> IsCompetitorRegisteredAsync(Guid competitorId, Guid competitionId);
        Task<bool> IsCompetitorRegisteredAsync(string competitorEmail, Guid competitionId);
        Task<Registration> AddRegistrationAsync(Registration registration, CancellationToken cancellationToken);
        Task<Registration?> GetRegistrationAsync(Guid registrationId, CancellationToken cancellationToken);
        Task DeleteRegistrationAsync(Registration registration, CancellationToken cancellationToken);
        Task<Competitor?> GetCompetitorAsync(Guid competitorId, CancellationToken cancellationToken);
        Competitor UpdateCompetitorAsync(Competitor competitorUpdated, CancellationToken cancellationToken);
        Task<ICollection<RankingCompetitor>> GetRankingAsync(Guid competitionId, CancellationToken cancellationToken);
        Task<ICollection<Competitor>> GetCompetitorsAsync(Guid competitionId, CancellationToken cancellationToken);
    }
}
