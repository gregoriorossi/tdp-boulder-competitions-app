namespace TDPCompetitions.Api.ViewModels.Editors.Responses.GetResultsResponse;

public sealed record GetResultsSentSpecialProblemResponse(
    Guid Id,
    Guid CompetitionId,
    Guid CompetitorId,
    Guid SpecialProblemId,
    DateTime SentAt
    )
{
    public GetResultsSentSpecialProblemResponse(Core.Entities.SentSpecialProblem sentProblem)
        : this(
           sentProblem.Id,
           sentProblem.CompetitionId,
           sentProblem.CompetitorId,
           sentProblem.SpecialProblemId,
           sentProblem.SentAt
            )
    { }
}
