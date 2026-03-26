using System.ComponentModel.DataAnnotations;

namespace TDPCompetitions.Api.ViewModels.Editors
{
    public class AddProblemToGroupVM
    {
        [Required]
        public string Name { get; set; } = default!;

        [Required]
        public Guid ProblemsGroupId { get; set; }

        [Required]
        public Guid CompetitionId { get; set; }
    }
}
