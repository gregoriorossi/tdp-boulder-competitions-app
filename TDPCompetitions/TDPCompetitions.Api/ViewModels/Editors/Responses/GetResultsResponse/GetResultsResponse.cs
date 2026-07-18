namespace TDPCompetitions.Api.ViewModels.Editors.Responses.GetResultsResponse;

public sealed record GetResultsResponse
{
    public IEnumerable<GetResultsCompetitionResponse> Competitors { get; set; } = new List<GetResultsCompetitionResponse>();

    public IEnumerable<ProblemsGroupResponse> ProblemsGroups { get; set; } = new List<ProblemsGroupResponse>();

    public IEnumerable<GetResultsSpecialProblemResponse> SpecialProblems { get; set; } = new List<GetResultsSpecialProblemResponse>();
}

public class GetResultsSpecialProblemSentByVM
{
    public Guid Id { get; set; }

    public string FirstName { get; set; } = default!;

    public string LastName { get; set; } = default!;

    public DateTime SentAt { get; set; }
}
