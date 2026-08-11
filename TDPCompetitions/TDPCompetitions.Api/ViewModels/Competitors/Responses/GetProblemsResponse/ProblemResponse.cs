using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Api.ViewModels.Competitors.Responses.GetProblemsResponse;

public sealed record ProblemResponse(
    Guid Id,
    string Name,
    Guid ProblemGroupId,
    Guid CompetitionId)
{
    public ProblemResponse(Problem problem)
        : this(
            problem.Id,
            problem.Name,
            problem.ProblemGroupId,
            problem.CompetitionId)
    { }
}
