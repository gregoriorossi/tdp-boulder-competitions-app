using System.ComponentModel.DataAnnotations;

namespace TDPCompetitions.Api.ViewModels.Editors.Requests;

public sealed record class SendSpecialProblemRequest
{
    [Required]
    public required Guid CompetitorId { get; set; }

    [Required]
    public required DateTime SentAt { get; set; }
}
