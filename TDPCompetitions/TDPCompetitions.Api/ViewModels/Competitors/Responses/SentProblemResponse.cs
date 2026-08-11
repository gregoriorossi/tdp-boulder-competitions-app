namespace TDPCompetitions.Api.ViewModels.Competitors.Responses;

public sealed record SentProblemResponse(
        Guid Id,
        Guid CompetitionId,
        Guid CompetitorId,
        Guid ProblemId,
        DateTime SentAt)
{
    public SentProblemResponse(Core.Entities.SentProblem sentProblem)
        : this(
            sentProblem.Id,
            sentProblem.CompetitionId,
            sentProblem.CompetitorId,
            sentProblem.ProblemId,
            sentProblem.SentAt)
    { }
}
