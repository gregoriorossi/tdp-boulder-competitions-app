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
        private readonly ICompetitionsManager _competitionsManager;

        public ProblemsManager(
            IProblemsRepository problemsRepository,
            ICompetitionsManager competitionsManager)
        {
            _problemsRepository = problemsRepository;
            _competitionsManager = competitionsManager;
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

        public async Task<Problem> AddProblemToGroupAsync(Problem problem, CancellationToken cancellationToken)
        {
            Problem result = await _problemsRepository.AddProblemToGroupAsync(problem, cancellationToken);
            return result;
        }

        public async Task DeleteProblemFromGroup(Problem problem, CancellationToken cancellationToken)
        {
            await _problemsRepository.DeleteProblemFromGroup(problem, cancellationToken);
        }

        public async Task<SpecialProblem?> GetSpecialProblemByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            Expression<Func<SpecialProblem, bool>> whereFn = p => p.Id == id;
            ICollection<SpecialProblem> result = await _problemsRepository.GetAllSpecialProblemsAsync(whereFn, cancellationToken);
            return result.FirstOrDefault();
        }

        public async Task<SpecialProblem> AddSpecialProblemAsync(SpecialProblem problem, CancellationToken cancellationToken)
        {
            var result = await _problemsRepository.AddSpecialProblemAsync(problem, cancellationToken);
            return result;  
        }

        public async Task DeleteSpecialProblemAsync(SpecialProblem problem, CancellationToken cancellationToken)
        {
            await _problemsRepository.DeleteSpecialProblemAsync(problem, cancellationToken);
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

        public async Task<ICollection<ProblemsGroup>> UpdateProblemsGroupsAsync(ICollection<ProblemsGroup> updatedGroups, Guid competitionId, CancellationToken cancellationToken)
        {
            Expression<Func<ProblemsGroup, bool>> whereFn = g => g.CompetitionId == competitionId;
            ICollection<ProblemsGroup> groups = await _problemsRepository.GetAllProblemsGroupsAsync(whereFn, cancellationToken);
            Competition? competition = await _competitionsManager.GetByIdAsync(competitionId, cancellationToken);
            if (competition == null)
            {
                throw new CompetitionNotFoundException(competitionId);
            }

            var updatedIds = updatedGroups.Where(g => g.Id != Guid.Empty)
                                    .Select(g => g.Id)
                                    .ToHashSet();

            foreach (var group in groups)
            {
                if (!updatedIds.Contains(group.Id))
                {
                    competition.ProblemGroups.Remove(group);
                }
            }

            var newGroups = updatedGroups.Where(g => g.Id == Guid.Empty).ToList();
            newGroups.ForEach(async (g) =>
            {
                competition.ProblemGroups.Add(g);
            });

            var existingGroupsById = competition.ProblemGroups.ToDictionary(f => f.Id);
            foreach (var updatedSection in updatedGroups.ToList())
            {
                if (existingGroupsById.TryGetValue(updatedSection.Id, out var groupToUpdate))
                {
                    groupToUpdate.ColorCode = updatedSection.ColorCode;
                    groupToUpdate.Order = updatedSection.Order;
                }
            }

            await _competitionsManager.UpdateAsync(competition, cancellationToken);
            return competition.ProblemGroups;
        }

        public async Task<SpecialProblem> UpdateSpecialProblemAsync(SpecialProblem updatedProblem, CancellationToken cancellationToken)
        {
            var problem = await GetSpecialProblemByIdAsync(updatedProblem.Id, cancellationToken) ?? throw new SpecialProblemNotFoundException(updatedProblem.Id);
            problem.Name = updatedProblem.Name;

            SpecialProblem result = await _problemsRepository.UpdateSpecialProblemAsync(problem, cancellationToken);
            return result;
        }
    }
}
