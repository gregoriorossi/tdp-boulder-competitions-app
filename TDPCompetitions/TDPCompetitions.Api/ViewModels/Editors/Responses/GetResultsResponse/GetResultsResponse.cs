namespace TDPCompetitions.Api.ViewModels.Editors.Responses.GetResultsResponse;

public sealed record GetResultsResponse
{
    public required IEnumerable<GetResultsCompetitionResponse> Competitors { get; set; } = new List<GetResultsCompetitionResponse>();

    public required IEnumerable<ProblemsGroupResponse> ProblemsGroups { get; set; } = new List<ProblemsGroupResponse>();

    public required IEnumerable<GetResultsSpecialProblemResponse> SpecialProblems { get; set; } = new List<GetResultsSpecialProblemResponse>();

    public required Dictionary<Guid, int> ProblemsScores { get; set; } = new Dictionary<Guid, int>();
}

public class GetResultsSpecialProblemSentByVM
{
    public Guid Id { get; set; }

    public string FirstName { get; set; } = default!;

    public string LastName { get; set; } = default!;

    public DateTime SentAt { get; set; }
}
