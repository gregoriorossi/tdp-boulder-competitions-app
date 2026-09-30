namespace TDPCompetitions.Api.ViewModels.Competitors.Responses;

public sealed record GetSentProblemsResponse(
    ICollection<SentProblemResponse> SentProblems,
    ICollection<SentSpecialProblemResponse> SentSpecialProblems)
{
}
