using System.ComponentModel.DataAnnotations;

namespace TDPCompetitions.Api.ViewModels.Editors.Requests
{
    public sealed record class UpdateProblemRequest
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; } = default!;

        [Required]
        public Guid ProblemGroupId { get; set; }

        [Required]
        public Guid CompetitionId { get; set; }
    }
}
