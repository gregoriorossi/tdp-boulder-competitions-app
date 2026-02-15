using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Api.ViewModels.Editors.Responses
{
    public class GetProblemsResponse
    {
        public ICollection<ProblemsGroupsResponse> ProblemsGroups { get; set; }
        public ICollection<SpecialProblemResponse> SpecialProblems { get; set; }

        public GetProblemsResponse(ICollection<ProblemsGroup> groups, ICollection<SpecialProblem> specialProblems) {
            ProblemsGroups = groups.Select(g => new ProblemsGroupsResponse(g)).ToList();
            SpecialProblems = specialProblems.Select(p => new SpecialProblemResponse(p)).ToList();
        }
    }

    public class ProblemsGroupsResponse
    {
        public Guid Id { get; set; }

        public int Order { get; set; }

        public string ColorCode { get; set; } = default!;

        public Guid CompetitionId { get; set; }

        public ICollection<ProblemResponse> Problems { get; set; } = new List<ProblemResponse>();

        public ProblemsGroupsResponse(ProblemsGroup group) 
        { 
            Id = group.Id;
            CompetitionId = group.CompetitionId;
            Order = group.Order;
            ColorCode = group.ColorCode;
            Problems = group.Problems.Select(p => new ProblemResponse(p)).ToList();
        }
    }

    public class ProblemResponse
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = default!;

        public Guid ProblemGroupId { get; set; }

        public Guid CompetitionId { get; set; } = default!;

        public ProblemResponse(Problem problem)
        {
            Id = problem.Id;
            Name = problem.Name;
            ProblemGroupId = problem.ProblemGroupId;
            CompetitionId = problem.CompetitionId;
        }
    }

    public class SpecialProblemResponse
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = default!;

        public Guid CompetitionId { get; set; } = default!;

        public SpecialProblemResponse(SpecialProblem problem)
        {
            Id = problem.Id;
            Name = problem.Name;
            CompetitionId = problem.CompetitionId;
        }
    }
}
