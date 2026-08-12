using System.ComponentModel.DataAnnotations;

namespace TDPCompetitions.Api.ViewModels.Editors.Requests;

public class UpdateCompetitionRequest
{
    [Required]
    public Guid Id { get; set; }

    [Required, StringLength(maximumLength: 100, MinimumLength = 5)]
    public string Title { get; set; } = default!;

    public string Description { get; set; } = default!;

    public bool RegistrationsOpen { get; set; }

    public bool RankingsVisible { get; set; }

    public DateTime Date { get; set; } = default!;

    public string EmailSubject { get; set; } = default!;

    public string EmailText { get; set; } = default!;

    public string PrivacyText { get; set; } = default!;

    public Guid? PrivacyAttachmentId { get; set; } = default!;

    public IFormFile? PrivacyAttachment { get; set; } = default!;
}
