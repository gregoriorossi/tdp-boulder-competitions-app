namespace TDPCompetitions.Api.ViewModels.Editors.Responses.GetResultsResponse;

public sealed record GetResultsSentSpecialProblemResponse(
    Guid CompetitionId,
    Guid CompetitorId,
    Guid SpecialProblemId,
    DateTime SentAt
    )
{
    public GetResultsSentSpecialProblemResponse(Core.Entities.SentSpecialProblem sentProblem)
        : this(
           sentProblem.CompetitionId,
           sentProblem.CompetitorId,
           sentProblem.SpecialProblemId,
           sentProblem.SentAt
            )
    { }
}
