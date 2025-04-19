namespace TDPCompetitionsAPI.Core.Entities
{
   
    public class Competition
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public bool AreRankingsVisible { get; set; }
        public bool IsRegistrationOpen { get; set; }
        public string Slug { get; set; } = string.Empty;
        public CompetitionState State { get; set; }
        public string EmailSubject { get; set; } = string.Empty;
        public string EmailBody { get; set; } = string.Empty;

    }
}
