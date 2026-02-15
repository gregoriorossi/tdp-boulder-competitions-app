using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Interfaces.Repositories;
using TDPCompetitions.Infrastracture.Data;

namespace TDPCompetitions.Infrastracture.Repositories
{
    public class ProblemsRepository : IProblemsRepository
    {
        private readonly AppDbContext _appDbContext;

        public ProblemsRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<ProblemsGroup> AddProblemsGroupAsync(ProblemsGroup group, CancellationToken cancellationToken)
        {
            await _appDbContext.ProblemsGroups.AddAsync(group);
            await _appDbContext.SaveChangesAsync(cancellationToken);
            return group;
        }

        public async Task<ICollection<Problem>> AddProblemsToGroupAsync(ICollection<Problem> problems, CancellationToken cancellationToken)
        {
            await _appDbContext.Problems.AddRangeAsync(problems);
            await _appDbContext.SaveChangesAsync(cancellationToken);
            return problems;
        }

        public async Task DeleteProblemFromGroup(Problem problem, CancellationToken cancellationToken)
        {
            _appDbContext.Problems.Remove(problem);
            await _appDbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task DeleteProblemsGroupAsync(ProblemsGroup group, CancellationToken cancellationToken)
        {
            _appDbContext.ProblemsGroups.Remove(group);
            await _appDbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task DeleteSentProblemAsync(SentProblem send, CancellationToken cancellationToken)
        {
            _appDbContext.SentProblems.Remove(send);
            await _appDbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task DeleteSentSpecialProblemAsync(SentSpecialProblem send, CancellationToken cancellationToken)
        {
            _appDbContext.SentSpecialProblems.Remove(send);
            await _appDbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task<ICollection<Problem>> GetAllAsync(Expression<Func<Problem, bool>> whereFn, CancellationToken cancellationToken)
        {
            return await _appDbContext.Problems
                        .Where(whereFn)
                        .ToListAsync(cancellationToken);
        }

        public async Task<ICollection<ProblemsGroup>> GetAllProblemsGroupsAsync(Expression<Func<ProblemsGroup, bool>> whereFn, CancellationToken cancellationToken)
        {
            return await _appDbContext.ProblemsGroups
                       .Where(whereFn)
                       .ToListAsync(cancellationToken);
        }

        public async Task<SentProblem?> GetSentProblemByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            return await _appDbContext.SentProblems.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<SentSpecialProblem?> GetSentSpecialProblemByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            return await _appDbContext.SentSpecialProblems.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<SentProblem> SendProblemAsync(SentProblem send, CancellationToken cancellationToken)
        {
            await _appDbContext.SentProblems.AddAsync(send);
            await _appDbContext.SaveChangesAsync(cancellationToken);
            return send;
        }

        public async Task<SentSpecialProblem> SendSpecialProblemAsync(SentSpecialProblem send, CancellationToken cancellationToken)
        {
            await _appDbContext.SentSpecialProblems.AddAsync(send);
            await _appDbContext.SaveChangesAsync(cancellationToken);
            return send;
        }

        public async Task<Problem> UpdateProblemAsync(Problem problem, CancellationToken cancellationToken)
        {
            _appDbContext.Problems.Update(problem);
            await _appDbContext.SaveChangesAsync(cancellationToken);
            return problem;
        }

        public async Task<ProblemsGroup> UpdateProblemsGroupAsync(ProblemsGroup group, CancellationToken cancellationToken)
        {
            _appDbContext.ProblemsGroups.Update(group);
            await _appDbContext.SaveChangesAsync(cancellationToken);
            return group;
        }
    }
}
