using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Api.ViewModels.Editors.Responses.GetResultsResponse
{
    public sealed record GetResultsCompetitionResponse(
        Guid Id,
        string FirstName,
        string LastName,
        DateTime BirthDate,
        IEnumerable<GetResultsSentProblemResponse> SentProblems,
        IEnumerable<GetResultsSentSpecialProblemResponse> SentSpecialProblems
        )
    {
        public GetResultsCompetitionResponse(
            Competitor competitor,
            IEnumerable<SentProblem> allSentProblems,
            IEnumerable<SentSpecialProblem> allSentSpecialProblems)
            : this(
                competitor.Id,
                competitor.FirstName,
                competitor.LastName,
                competitor.BirthDate,
                allSentProblems
                    .Where(sp => sp.CompetitorId == competitor.Id)
                    .Select(sp => new GetResultsSentProblemResponse(sp.Id, sp.ProblemId)),
                allSentSpecialProblems
                  .Where(sp => sp.CompetitorId == competitor.Id)
                  .Select(sp => new GetResultsSentSpecialProblemResponse(sp))
            )
        { }
    }
}
