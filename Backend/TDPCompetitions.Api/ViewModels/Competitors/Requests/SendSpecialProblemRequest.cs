using System.ComponentModel.DataAnnotations;

namespace TDPCompetitions.Api.ViewModels.Competitors.Requests;

public class SendSpecialProblemRequest
{
    [Required]
    public required Guid CompetitorId { get; set; }
}
