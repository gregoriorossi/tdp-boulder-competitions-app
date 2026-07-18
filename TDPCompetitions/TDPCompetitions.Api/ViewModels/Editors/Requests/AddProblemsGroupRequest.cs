using System.ComponentModel.DataAnnotations;

namespace TDPCompetitions.Api.ViewModels.Editors.Requests
{
    public sealed record class AddProblemsGroupRequest
    {
        [Required]
        public string ColorCode { get; set; } = default!;

        [Required]
        public Guid CompetitionId { get; set; } = default;

        public int Order { get; set; }
    }
}
