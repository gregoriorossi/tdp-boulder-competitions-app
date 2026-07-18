namespace TDPCompetitions.Api.ViewModels.Editors.Responses
{
    public sealed record SentProblemResponse(

        Guid CompetitionId,
        Guid CompetitorId,
        Guid ProblemId,
        DateTime SentAt)
    {
        public SentProblemResponse(Core.Entities.SentProblem sentProblem)
            : this(
                sentProblem.CompetitionId,
                sentProblem.CompetitorId,
                sentProblem.ProblemId,
                sentProblem.SentAt)
        { }
    }
}
