using System.ComponentModel.DataAnnotations;

namespace TDPCompetitions.Api.ViewModels.Editors.Responses
{
    public class AddSpecialProblemResponse
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; } = default!;

        [Required]
        public Guid CompetitionId { get; set; } = default!;
    }
}
