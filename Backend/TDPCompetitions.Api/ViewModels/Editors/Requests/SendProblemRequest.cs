using System.ComponentModel.DataAnnotations;

namespace TDPCompetitions.Api.ViewModels.Editors.Requests;

public sealed record class SendProblemRequest
{
    [Required]
    public required Guid CompetitorId { get; set; }
}
