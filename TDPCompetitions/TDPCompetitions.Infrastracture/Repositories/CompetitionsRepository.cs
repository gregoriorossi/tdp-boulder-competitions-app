using System.Linq.Expressions;
using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Interfaces.Repositories;

namespace TDPCompetitions.Infrastracture.Repositories
{
    public class CompetitionsRepository : ICompetitionsRepository
    {
        public Task<Competition> AddAsync(Competition competition, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<Registration> AddRegistration(Registration registration, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(Competition competition, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ICollection<Competition>> GetAllAsync(Expression<Func<Competition, bool>> whereFn, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<Competitor?> GetAllCompetitors(Expression<Func<Competitor, bool>> whereFn, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ICollection<Competitor>> GetCompetitorsAsync(Expression<Func<Competitor, bool>> whereFn, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ICollection<Registration>> GetRegistrationsAsync(Expression<Func<Registration, bool>> whereFn, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<Competition> UpdateCompetitionAsync(Competition competition, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<Competitor> UpdateCompetitorAsync(Competitor competitor, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
