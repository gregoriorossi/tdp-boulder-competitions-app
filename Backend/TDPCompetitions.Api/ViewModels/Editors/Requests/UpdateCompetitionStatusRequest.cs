using System.ComponentModel.DataAnnotations;

namespace TDPCompetitions.Api.ViewModels.Editors.Requests
{
    public class UpdateCompetitionStatusRequest
    {
        [Required]
        public int Status { get; set; }
    }
}
