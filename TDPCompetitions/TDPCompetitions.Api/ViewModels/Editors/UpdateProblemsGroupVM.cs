using System.ComponentModel.DataAnnotations;

namespace TDPCompetitions.Api.ViewModels.Editors
{
    public class UpdateProblemsGroupVM
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string ColorCode { get; set; } = default!;

        [Required]
        public Guid CompetitionId { get; set; } = default;

        public int Order { get; set; }
    }
}
