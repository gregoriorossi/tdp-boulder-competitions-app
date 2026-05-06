using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Api.ViewModels.Editors.Responses
{
    public class GetResultsResponse
    {
        public IEnumerable<GetResultsCompetitionVM> Competitors { get; set; } = new List<GetResultsCompetitionVM>();
        
        public IEnumerable<ProblemsGroupsResponse> ProblemsGroups { get; set; } = new List<ProblemsGroupsResponse>();

        public IEnumerable<SpecialProblemResponse> SpecialProblems { get; set; } = new List<SpecialProblemResponse>();

        public IEnumerable<SentProblem> SentProblems { get; set; } = new List<SentProblem>();

        public IEnumerable<SentSpecialProblem> SentSpecialProblem { get; set; } = new List<SentSpecialProblem>();
    }

    public class GetResultsCompetitionVM
    {
        public Guid Id { get; set; }

        public string FirstName { get; set; } = default!;

        public string LastName { get; set; } = default!;

        public DateTime BirthDate { get; set; }

        public GetResultsCompetitionVM(Competitor competitor)
        {
            Id = competitor.Id;
            FirstName = competitor.FirstName;
            LastName = competitor.LastName;
            BirthDate = competitor.BirthDate;
        }
    }
}
