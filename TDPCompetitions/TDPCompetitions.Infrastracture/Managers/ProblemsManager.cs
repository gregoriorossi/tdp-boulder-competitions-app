using System.Linq.Expressions;
using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Exceptions;
using TDPCompetitions.Core.Interfaces.Managers;
using TDPCompetitions.Core.Interfaces.Repositories;

namespace TDPCompetitions.Infrastracture.Managers
{
    public class ProblemsManager : IProblemsManager
    {
        private readonly IProblemsRepository _problemsRepository;

        public ProblemsManager(IProblemsRepository problemsRepository)
        {
            _problemsRepository = problemsRepository;
        }

        public async Task<ProblemsGroup> AddProblemsGroupAsync(ProblemsGroup group, CancellationToken cancellationToken)
        {
            Expression<Func<ProblemsGroup, bool>> whereFn = g => g.CompetitionId == group.CompetitionId;
            int maxOrder = (await _problemsRepository.GetAllProblemsGroupsAsync(whereFn, cancellationToken))
                    .Max(g => g.Order);

            group.Order = maxOrder;

            ProblemsGroup result = await _problemsRepository.AddProblemsGroupAsync(group, cancellationToken);
            return result;
        }

        public async Task<ICollection<Problem>> AddProblemsToGroupAsync(ICollection<Problem> problems, CancellationToken cancellationToken)
        {
            ICollection<Problem> result = await _problemsRepository.AddProblemsToGroupAsync(problems, cancellationToken);
            return result;
        }

        public async Task DeleteProblemFromGroup(Problem problem, CancellationToken cancellationToken)
        {
            await _problemsRepository.DeleteProblemFromGroup(problem, cancellationToken);
        }

        public async Task DeleteProblemsGroupAsync(ProblemsGroup group, CancellationToken cancellationToken)
        {
            await _problemsRepository.DeleteProblemsGroupAsync(group, cancellationToken);
        }

        public async Task<ICollection<ProblemsGroup>> GetProblemsGroupsByCompetitionIdAsync(Guid competitionId, CancellationToken cancellationToken)
        {
            Expression<Func<ProblemsGroup, bool>> whereFn = g => g.CompetitionId == competitionId;
            ICollection<ProblemsGroup> result = await _problemsRepository.GetAllProblemsGroupsAsync(whereFn, cancellationToken);
            return result.OrderBy(g => g.Order).ToList();
        }

        public async Task<ICollection<SpecialProblem>> GetSpecialProblemsByCompetitionIdAsync(Guid competitionId, CancellationToken cancellationToken)
        {
            Expression<Func<SpecialProblem, bool>> whereFn = g => g.CompetitionId == competitionId;
            ICollection<SpecialProblem> result = await _problemsRepository.GetAllSpecialProblemsAsync(whereFn, cancellationToken);
            return result.OrderBy(g => g.Name).ToList();
        }

        public async Task<Problem?> GetProblemByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            Expression<Func<Problem, bool>> whereFn = p => p.Id == id;
            ICollection<Problem> problems = await _problemsRepository.GetAllAsync(whereFn, cancellationToken);
            return problems.FirstOrDefault();
        }

        public async Task<ProblemsGroup?> GetProblemsGroupByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            Expression<Func<ProblemsGroup, bool>> whereFn = g => g.Id == id;
            ICollection<ProblemsGroup> groups = await _problemsRepository.GetAllProblemsGroupsAsync(whereFn, cancellationToken);
            return groups.FirstOrDefault();
        }

        public async Task DeleteSentProblem(Guid id, CancellationToken cancellationToken)
        {
            SentProblem? problem = await _problemsRepository.GetSentProblemByIdAsync(id, cancellationToken);
            if (problem != null)
            {
                await _problemsRepository.DeleteSentProblemAsync(problem, cancellationToken);
            }
        }

        public async Task DeleteSentSpecialProblemAsync(Guid id, CancellationToken cancellationToken)
        {
            SentSpecialProblem? problem = await _problemsRepository.GetSentSpecialProblemByIdAsync(id, cancellationToken);
            if (problem != null)
            {
                await _problemsRepository.DeleteSentSpecialProblemAsync(problem, cancellationToken);
            }
        }

        public async Task<SentProblem> SendProblemAsync(SentProblem send, CancellationToken cancellationToken)
        {
            SentProblem result = await _problemsRepository.SendProblemAsync(send, cancellationToken);
            return result;
        }

        public async Task<SentSpecialProblem> SendSpecialProblemAsync(SentSpecialProblem send, CancellationToken cancellationToken)
        {
            SentSpecialProblem result = await _problemsRepository.SendSpecialProblemAsync(send, cancellationToken);
            return result;
        }

        public async Task<Problem> UpdateProblemAsync(Problem updatedProblem, CancellationToken cancellationToken)
        {
            var problem = await GetProblemByIdAsync(updatedProblem.Id, cancellationToken) ?? throw new ProblemNotFoundException(updatedProblem.Id);
            problem.Name = updatedProblem.Name;

            Problem result = await _problemsRepository.UpdateProblemAsync(problem, cancellationToken);
            return result;
        }

        public async Task<ProblemsGroup> UpdateProblemsGroupAsync(ProblemsGroup updatedGroup, CancellationToken cancellationToken)
        {
            var group = await GetProblemsGroupByIdAsync(updatedGroup.Id, cancellationToken) ?? throw new ProblemsGroupNotFoundException(updatedGroup.Id);
            int oldOrder = group.Order;
            int newOrder = updatedGroup.Order;

            group.ColorCode = updatedGroup.ColorCode;
            group.Order = updatedGroup.Order;


            if (oldOrder != newOrder)
            {
                Expression<Func<ProblemsGroup, bool>> whereFn = g => g.Order == newOrder && g.CompetitionId == updatedGroup.CompetitionId;
                ProblemsGroup? groupToSwitch = (await _problemsRepository.GetAllProblemsGroupsAsync(whereFn, cancellationToken)).FirstOrDefault();
                if (groupToSwitch != null)
                {
                    groupToSwitch.Order = oldOrder;
                    await _problemsRepository.UpdateProblemsGroupAsync(groupToSwitch, cancellationToken);
                }
            }

            ProblemsGroup result = await _problemsRepository.UpdateProblemsGroupAsync(group, cancellationToken);
            return result;
        }
    }
}
