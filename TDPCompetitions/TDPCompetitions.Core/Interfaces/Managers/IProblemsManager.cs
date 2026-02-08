using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Core.Interfaces.Managers
{
    public interface IProblemsManager
    {
        Task<ProblemsGroup> AddProblemGroupAsync(ProblemsGroup group, CancellationToken cancellationToken);
        Task<ICollection<Problem>> AddProblemsToGroupAsync(ICollection<Problem> problems, CancellationToken cancellationToken);
        Task<ProblemsGroup?> DeleteProblemGroupAsync(Guid id, CancellationToken cancellationToken);
        Task<ICollection<ProblemsGroup>> GetByCompetitionIdAsync(Guid competitionId, CancellationToken cancellationToken);
        Task<ProblemsGroup?> GetProblemGroupByIdAsync(Guid id, CancellationToken cancellationToken);
        Task<ProblemsGroup> UpdateProblemsGroupAsync(ProblemsGroup group, CancellationToken cancellationToken);
    }
}
