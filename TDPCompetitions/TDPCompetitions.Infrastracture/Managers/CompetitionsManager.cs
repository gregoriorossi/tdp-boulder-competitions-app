using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Enums;
using TDPCompetitions.Core.Interfaces.Managers;

namespace TDPCompetitions.Infrastracture.Managers
{
    public class CompetitionsManager : ICompetitionsManager
    {
        public Task<bool> CompetitionExists(Guid id, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<Competition> AddAsync(Competition competition, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(Competition competition, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<Competition?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<Competition?> GetBySlugAsync(string slug, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<bool> IsSlugAvailableAsync(Competition competition, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<Competition> UpdateAsync(Competition updateCompetition, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task UpdateCompetitionStatusAsync(CompetitionStatus? status, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<bool> IsCompetitorRegisteredAsync(Guid competitorId, Guid competitionId)
        {
            throw new NotImplementedException();
        }
    }
}
