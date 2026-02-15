using System.Linq.Expressions;
using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Core.Interfaces.Repositories
{
    public interface ICompetitionsRepository
    {
        Task<Competition> AddAsync(Competition competition, CancellationToken cancellationToken);
        Task<Registration> AddRegistration(Registration registration, CancellationToken cancellationToken);
        Task DeleteAsync(Competition competition, CancellationToken cancellationToken);
        Task<ICollection<Competition>> GetAllAsync(Expression<Func<Competition, bool>> whereFn, CancellationToken cancellationToken);
        Task<ICollection<Competitor>> GetAllCompetitorsAsync(Expression<Func<Competitor, bool>> whereFn, CancellationToken cancellationToken);
        Task<ICollection<Registration>> GetAllRegistrationsAsync(Expression<Func<Registration, bool>> whereFn, CancellationToken cancellationToken);
        Task<Competition> UpdateCompetitionAsync(Competition competition, CancellationToken cancellationToken);
        Task<Competitor> UpdateCompetitorAsync(Competitor competitor, CancellationToken cancellationToken);
    }
}
