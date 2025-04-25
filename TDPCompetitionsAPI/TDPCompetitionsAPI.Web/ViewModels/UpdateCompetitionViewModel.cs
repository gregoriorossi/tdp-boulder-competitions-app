namespace TDPCompetitionsAPI.Web.ViewModels
{
    public class UpdateCompetitionViewModel : CompetitionViewModel
    {
        public Guid Id { get; set; }
     
        public string Description { get; set; }

        public bool AreRankinsVisible { get; set; }

        public bool IsRegistrationOpen { get;set; }

        public string EmailSubject { get; set; }

        public string EmailBody { get; set; }
    }
}
