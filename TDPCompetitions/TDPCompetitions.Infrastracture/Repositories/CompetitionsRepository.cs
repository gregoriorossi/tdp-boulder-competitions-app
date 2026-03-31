using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Interfaces.Repositories;
using TDPCompetitions.Infrastracture.Data;

namespace TDPCompetitions.Infrastracture.Repositories
{
    public class CompetitionsRepository : ICompetitionsRepository
    {
        private readonly AppDbContext _appDbContext;

        public CompetitionsRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<Competition> AddAsync(Competition competition, CancellationToken cancellationToken)
        {
            await _appDbContext.Competitions.AddAsync(competition);
            await _appDbContext.SaveChangesAsync(cancellationToken);
            return competition;
        }

        public async Task<Registration> AddRegistration(Registration registration, CancellationToken cancellationToken)
        {
            await _appDbContext.Registrations.AddAsync(registration);
            await _appDbContext.SaveChangesAsync(cancellationToken);
            return registration;
        }

        public async Task DeleteAsync(Competition competition, CancellationToken cancellationToken)
        {
            _appDbContext.Competitions.Remove(competition);
            await _appDbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task DeleteCompetitorAsync(Competitor competitor, CancellationToken cancellationToken)
        {
            _appDbContext.Competitors.Remove(competitor);
            await _appDbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task DeleteRegistrationAsync(Registration registration, CancellationToken cancellationToken)
        {
            _appDbContext.Registrations.Remove(registration);
            await _appDbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task<ICollection<Competition>> GetAllAsync(Expression<Func<Competition, bool>> whereFn, CancellationToken cancellationToken)
        {
            return await _appDbContext.Competitions
                .Where(whereFn)
                .ToListAsync(cancellationToken);
        }

        public async Task<ICollection<Competitor>> GetAllCompetitorsAsync(Expression<Func<Competitor, bool>> whereFn, CancellationToken cancellationToken)
        {
            return await _appDbContext.Competitors
                .Where(whereFn)
                .ToListAsync(cancellationToken);
        }

        public async Task<ICollection<Registration>> GetAllRegistrationsAsync(Expression<Func<Registration, bool>> whereFn, CancellationToken cancellationToken)
        {
            return await _appDbContext.Registrations
                .Include(r => r.Competitor)
                .Include(r => r.Minors)
               .Where(whereFn)
               .ToListAsync(cancellationToken);
        }

        public async Task<Competition> UpdateCompetitionAsync(Competition competition, CancellationToken cancellationToken)
        {
            _appDbContext.Competitions.Update(competition);
            await _appDbContext.SaveChangesAsync(cancellationToken);
            return competition;
        }

        public async Task<Competitor> UpdateCompetitorAsync(Competitor competitor, CancellationToken cancellationToken)
        {
            _appDbContext.Competitors.Update(competitor);
            await _appDbContext.SaveChangesAsync(cancellationToken);
            return competitor;  
        }
    }
}
