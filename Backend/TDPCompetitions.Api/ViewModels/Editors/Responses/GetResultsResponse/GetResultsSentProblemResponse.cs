namespace TDPCompetitions.Api.ViewModels.Editors.Responses.GetResultsResponse
{
    public sealed record GetResultsSentProblemResponse(
        Guid Id,
        Guid ProblemId
        )
    {
        public GetResultsSentProblemResponse(Core.Entities.SentProblem sentProblem)
            : this(
                sentProblem.Id,
                sentProblem.ProblemId
                )
        { }
    }
}
