using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Api.ViewModels.Editors.Responses
{
    public class GetResultsResponse
    {
        public IEnumerable<GetResultsCompetitionVM> Competitors { get; set; } = new List<GetResultsCompetitionVM>();

        public IEnumerable<ProblemsGroupsResponse> ProblemsGroups { get; set; } = new List<ProblemsGroupsResponse>();

        public IEnumerable<GetResultsSpecialProblemVM> SpecialProblems { get; set; } = new List<GetResultsSpecialProblemVM>();
    }

    public class GetResultsCompetitionVM
    {
        public Guid Id { get; set; }

        public string FirstName { get; set; } = default!;

        public string LastName { get; set; } = default!;

        public DateTime BirthDate { get; set; }

        public IEnumerable<Guid> SentProblems { get; set; } = new List<Guid>();

        public IEnumerable<SentSpecialProblem> SentSpecialProblems { get; set; } = new List<SentSpecialProblem>();

        public GetResultsCompetitionVM(Competitor competitor, IEnumerable<SentProblem> allSentProblems, IEnumerable<SentSpecialProblem> allSentSpecialProblems)
        {
            Id = competitor.Id;
            FirstName = competitor.FirstName;
            LastName = competitor.LastName;
            BirthDate = competitor.BirthDate;
            SentProblems = allSentProblems.Where(sp => sp.CompetitorId == competitor.Id).Select(sp => sp.ProblemId);
            SentSpecialProblems = allSentSpecialProblems.Where(sp => sp.CompetitorId == competitor.Id);
        }
    }

    public class GetResultsSpecialProblemVM
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = default!;

        public GetResultsSpecialProblemSentByVM? FirstSentBy { get; set; }

        public GetResultsSpecialProblemVM(SpecialProblem specialProblem, IEnumerable<SentSpecialProblem> sentSpecialProblems, IEnumerable<Competitor> competitors)
        {
            Name = specialProblem.Name;
            Id = specialProblem.Id;
            FirstSentBy = sentSpecialProblems
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
                .FirstOrDefault();

           
        }
    }

    public class GetResultsSpecialProblemSentByVM
    {
        public Guid Id { get; set; }

        public string FirstName { get; set; } = default!;

        public string LastName { get; set; } = default!;

        public DateTime SentAt { get; set; }
    }
}
