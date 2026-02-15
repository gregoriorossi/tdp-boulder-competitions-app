using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Enums;

namespace TDPCompetitions.Api.ViewModels.Editors.Responses
{
    public class GetAllCompetitionsResponse
    {
        public Guid Id { get; set; }

        public string Title { get; set; } = default!;

        public bool RegistrationsOpen { get; set; }

        public DateTime Date { get; set; } = default!;

        public CompetitionStatus Status { get; set; } = default!;

        public GetAllCompetitionsResponse(Competition competition) { 
            Id = competition.Id;
            Title = competition.Title;
            RegistrationsOpen = competition.RegistrationsOpen;
            Date = competition.Date;
            Status = competition.Status;
        }
    }
}
