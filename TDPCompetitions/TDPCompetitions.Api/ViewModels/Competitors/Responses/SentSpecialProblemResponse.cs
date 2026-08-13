using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Api.ViewModels.Competitors.Responses;

public sealed record SentSpecialProblemResponse(
    Guid Id,
    Guid CompetitionId,
    Guid CompetitorId,
    Guid SpecialProblemId,
    DateTime SentAt)
{
    public SentSpecialProblemResponse(SentSpecialProblem problem)
        : this(
            problem.Id,
            problem.CompetitionId,
            problem.CompetitorId,
            problem.SpecialProblemId,
            problem.SentAt)
    { }
}
