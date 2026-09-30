using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Api.ViewModels.Competitors.Responses.GetProblemsResponse;

public sealed record GetProblemsResponse(
     ICollection<ProblemsGroupResponse> ProblemsGroups,
     ICollection<SpecialProblemResponse> SpecialProblems)
{
    public GetProblemsResponse(
        ICollection<ProblemsGroup> groups,
        ICollection<SpecialProblem> specialProblems) : this(
            groups.Select(g => new ProblemsGroupResponse(g)).ToList(),
            specialProblems.Select(p => new SpecialProblemResponse(p)).ToList()
        )
    { }
}
