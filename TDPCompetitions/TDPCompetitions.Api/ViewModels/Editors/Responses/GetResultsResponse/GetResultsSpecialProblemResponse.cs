using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Api.ViewModels.Editors.Responses.GetResultsResponse;

public sealed record GetResultsSpecialProblemResponse(

    Guid Id,
    string Name,
    GetResultsSpecialProblemSentByVM? FirstSentBy)
{
    public GetResultsSpecialProblemResponse(
        SpecialProblem specialProblem,
        IEnumerable<SentSpecialProblem> sentSpecialProblems,
        IEnumerable<Competitor> competitors)
        : this(
            specialProblem.Id,
            specialProblem.Name,
            sentSpecialProblems
                .Where(sp => specialProblem.Id == sp.SpecialProblemId)
                    .OrderBy(sp => sp.SentAt)
                    .Select(sp =>
                    {
                        var competitor = competitors.FirstOrDefault(c => c.Id == sp.CompetitorId);
                        return competitor != null ? new GetResultsSpecialProblemSentByVM()
                        {
                            Id = competitor.Id,
                            FirstName = competitor.FirstName,
                            LastName = competitor.LastName,
                            SentAt = sp.SentAt
                        } : null;
                    })
                    .FirstOrDefault())
    { }

}
