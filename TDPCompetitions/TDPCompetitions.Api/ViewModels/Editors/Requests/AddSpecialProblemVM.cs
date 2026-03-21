using System.ComponentModel.DataAnnotations;

namespace TDPCompetitions.Api.ViewModels.Editors.Requests
{
    public class AddSpecialProblemVM
    {
        [Required]
        public string Name { get; set; } = default!;

        [Required]
        public Guid CompetitionId { get; set; } = default!;
    }
}
