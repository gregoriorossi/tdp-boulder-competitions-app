namespace TDPCompetitions.Api.ViewModels.Editors.Responses;

public sealed record class SentSpecialProblemResponse(
        Guid CompetitionId,
        Guid CompetitorId,
        Guid ProblemId,
        DateTime SentAt)
{
    public SentSpecialProblemResponse(Core.Entities.SentSpecialProblem sentSpecialProblem)
        : this(
            sentSpecialProblem.CompetitionId,
            sentSpecialProblem.CompetitorId,
            sentSpecialProblem.SpecialProblemId,
            sentSpecialProblem.SentAt)
    { }
}

