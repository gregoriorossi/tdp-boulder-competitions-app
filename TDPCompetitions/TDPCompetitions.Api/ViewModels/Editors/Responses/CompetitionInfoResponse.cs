using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Enums;

namespace TDPCompetitions.Api.ViewModels.Editors.Responses
{
    public class CompetitionInfoResponse
    {
        public Guid Id { get; set; }

        public string Title { get; set; } = default!;

        public string Description { get; set; } = default!;

        public DateTime Date { get; set; } = default!;

        public string Slug { get; set; } = default!;

        public bool RegistrationsOpen { get; set; }

        public Guid? BannerImageId { get; set; } = default!;

        public Guid? PrivacyAttachmentId { get; set; } = default!;

        public string PrivacyText { get; set; } = default!;

        public string EmailText { get; set; } = default!;

        public CompetitionStatus Status { get; set; } = default!;



        public CompetitionInfoResponse(Competition competition)
        {
            Id = competition.Id;
            Title = competition.Title;
            Description = competition.Description;
            EmailText = competition.EmailText;
            Slug = competition.Slug;
            RegistrationsOpen = competition.RegistrationsOpen;
            Date = competition.Date;
            BannerImageId = competition.BannerImageId;
            PrivacyAttachmentId = competition.PrivacyAttachmentId;
            PrivacyText = competition.PrivacyText;
            Status = competition.Status;
        }
    }
}
