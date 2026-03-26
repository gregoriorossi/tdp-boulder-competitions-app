using System.Linq.Expressions;
using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Core.Interfaces.Repositories
{
    public interface IProblemsRepository
    {
        Task<ProblemsGroup> AddProblemsGroupAsync(ProblemsGroup group, CancellationToken cancellationToken);

        Task<Problem> AddProblemToGroupAsync(Problem problems, CancellationToken cancellationToken);

        Task DeleteProblemFromGroup(Problem problem, CancellationToken cancellationToken);

        Task DeleteSentProblemAsync(SentProblem id, CancellationToken cancellationToken);

        Task DeleteSentSpecialProblemAsync(SentSpecialProblem id, CancellationToken cancellationToken);

        Task<SpecialProblem> AddSpecialProblemAsync(SpecialProblem problem, CancellationToken cancellationToken);

        Task DeleteSpecialProblemAsync(SpecialProblem problem, CancellationToken cancellationToken);

        Task<ICollection<Problem>> GetAllAsync(Expression<Func<Problem, bool>> whereFn, CancellationToken cancellationToken);

        Task<ICollection<ProblemsGroup>> GetAllProblemsGroupsAsync(Expression<Func<ProblemsGroup, bool>> whereFn, CancellationToken cancellationToken);
        
        Task<ICollection<SpecialProblem>> GetAllSpecialProblemsAsync(Expression<Func<SpecialProblem, bool>> whereFn, CancellationToken cancellationToken);
        
        Task<SentProblem?> GetSentProblemByIdAsync(Guid id, CancellationToken cancellationToken);

        Task<SentSpecialProblem?> GetSentSpecialProblemByIdAsync(Guid id, CancellationToken cancellationToken);

        Task<SentProblem> SendProblemAsync(SentProblem send, CancellationToken cancellationToken);

        Task<SentSpecialProblem> SendSpecialProblemAsync(SentSpecialProblem send, CancellationToken cancellationToken);

        Task<Problem> UpdateProblemAsync(Problem problem, CancellationToken cancellationToken);

        Task<ProblemsGroup> UpdateProblemsGroupAsync(ProblemsGroup group, CancellationToken cancellationToken);

        Task<SpecialProblem> UpdateSpecialProblemAsync(SpecialProblem problem, CancellationToken cancellationToken);
    }
}
