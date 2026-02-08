using System.ComponentModel.DataAnnotations;

namespace TDPCompetitions.Api.ViewModels.Editors
{
    public class UpdateCompetitionStatusVM
    {
        [Required]
        public Guid CompetitionId { get; set; }

        [Required]
        public int Status { get; set; }
    }
}
