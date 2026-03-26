using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Core.Interfaces.Managers
{
    public interface IProblemsManager
    {
        Task<ProblemsGroup> AddProblemsGroupAsync(ProblemsGroup group, CancellationToken cancellationToken);
        Task<Problem> AddProblemToGroupAsync(Problem problems, CancellationToken cancellationToken);
        Task DeleteProblemFromGroup(Problem problem, CancellationToken cancellationToken);
        Task<SpecialProblem?> GetSpecialProblemByIdAsync(Guid id, CancellationToken cancellationToken);
        Task<SpecialProblem> AddSpecialProblemAsync(SpecialProblem problem, CancellationToken cancellationToken);
        Task DeleteSpecialProblemAsync(SpecialProblem problem, CancellationToken cancellationToken);
        Task<ICollection<ProblemsGroup>> GetProblemsGroupsByCompetitionIdAsync(Guid competitionId, CancellationToken cancellationToken);
        Task<Problem?> GetProblemByIdAsync(Guid id, CancellationToken cancellationToken);
        Task<ProblemsGroup?> GetProblemsGroupByIdAsync(Guid id, CancellationToken cancellationToken);
        Task DeleteSentProblem(Guid id, CancellationToken cancellationToken);
        Task DeleteSentSpecialProblemAsync(Guid id, CancellationToken cancellationToken);
        Task<SentProblem> SendProblemAsync(SentProblem send, CancellationToken cancellationToken);
        Task<SentSpecialProblem> SendSpecialProblemAsync(SentSpecialProblem send, CancellationToken cancellationToken);
        Task<Problem> UpdateProblemAsync(Problem problem, CancellationToken cancellationToken);
        Task<ICollection<ProblemsGroup>> UpdateProblemsGroupsAsync(ICollection<ProblemsGroup> groups, Guid competitionId, CancellationToken cancellationToken);
        Task<SpecialProblem> UpdateSpecialProblemAsync(SpecialProblem problem, CancellationToken cancellationToken);
        Task<ICollection<SpecialProblem>> GetSpecialProblemsByCompetitionIdAsync(Guid competitionId, CancellationToken cancellationToken);
    }
}
