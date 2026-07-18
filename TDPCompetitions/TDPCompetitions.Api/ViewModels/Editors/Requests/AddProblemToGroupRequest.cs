using System.ComponentModel.DataAnnotations;

namespace TDPCompetitions.Api.ViewModels.Editors.Requests
{
    public class AddProblemToGroupRequest
    {
        [Required]
        public string Name { get; set; } = default!;

        [Required]
        public Guid ProblemsGroupId { get; set; }

        [Required]
        public Guid CompetitionId { get; set; }
    }
}
