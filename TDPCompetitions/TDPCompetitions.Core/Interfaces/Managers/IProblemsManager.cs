using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Core.Interfaces.Managers
{
    public interface IProblemsManager
    {
        Task<ProblemsGroup> AddProblemsGroupAsync(ProblemsGroup group, CancellationToken cancellationToken);
        Task<ICollection<Problem>> AddProblemsToGroupAsync(ICollection<Problem> problems, CancellationToken cancellationToken);
        Task DeleteProblemFromGroup(Problem problem, CancellationToken cancellationToken);
        Task DeleteProblemsGroupAsync(ProblemsGroup id, CancellationToken cancellationToken);
        Task<ICollection<ProblemsGroup>> GetByCompetitionIdAsync(Guid competitionId, CancellationToken cancellationToken);
        Task<Problem?> GetProblemByIdAsync(Guid id, CancellationToken cancellationToken);
        Task<ProblemsGroup?> GetProblemsGroupByIdAsync(Guid id, CancellationToken cancellationToken);
        Task DeleteSentProblem(Guid id, CancellationToken cancellationToken);
        Task DeleteSentSpecialProblemAsync(Guid id, CancellationToken cancellationToken);
        Task<SentProblem> SendProblemAsync(SentProblem send, CancellationToken cancellationToken);
        Task<SentSpecialProblem> SendSpecialProblemAsync(SentSpecialProblem send, CancellationToken cancellationToken);
        Task<Problem> UpdateProblemAsync(Problem problem, CancellationToken cancellationToken);
        Task<ProblemsGroup> UpdateProblemsGroupAsync(ProblemsGroup group, CancellationToken cancellationToken);
    }
}
