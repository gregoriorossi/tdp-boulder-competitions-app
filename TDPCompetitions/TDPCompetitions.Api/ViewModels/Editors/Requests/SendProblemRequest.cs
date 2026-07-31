using System.ComponentModel.DataAnnotations;

namespace TDPCompetitions.Api.ViewModels.Editors.Requests;

public class SendProblemRequest
{
    [Required]
    public Guid CompetitorId { get; set; }
}
