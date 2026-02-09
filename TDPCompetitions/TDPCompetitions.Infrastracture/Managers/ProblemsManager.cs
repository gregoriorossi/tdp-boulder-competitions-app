using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Interfaces.Managers;

namespace TDPCompetitions.Infrastracture.Managers
{
    public class ProblemsManager : IProblemsManager
    {
        public Task<ProblemsGroup> AddProblemGroupAsync(ProblemsGroup group, CancellationToken cancellationToken)
        {
            //gestire l'ordine
            throw new NotImplementedException();
        }

        public Task<ICollection<Problem>> AddProblemsToGroupAsync(ICollection<Problem> problems, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task DeleteProblemFromGroup(Problem problem, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ProblemsGroup?> DeleteProblemGroupAsync(Guid id, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ICollection<ProblemsGroup>> GetByCompetitionIdAsync(Guid competitionId, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<Problem?> GetProblemByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ProblemsGroup?> GetProblemGroupByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task RemoveSentProblem(Guid id, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task RemoveSentSpecialProblemAsync(Guid id, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<SentProblem> SendProblemAsync(SentProblem send)
        {
            throw new NotImplementedException();
        }

        public Task<SentSpecialProblem> SendSepcialProblemAsync(SentSpecialProblem send)
        {
            throw new NotImplementedException();
        }

        public Task<Problem> UpdateProblem(Problem problem, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ProblemsGroup> UpdateProblemsGroupAsync(ProblemsGroup group, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
