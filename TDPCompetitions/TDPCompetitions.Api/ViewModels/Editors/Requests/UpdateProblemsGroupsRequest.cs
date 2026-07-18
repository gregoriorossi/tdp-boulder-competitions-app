using System.ComponentModel.DataAnnotations;
using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Api.ViewModels.Editors.Requests
{
    public sealed record class UpdateProblemsGroupsRequest
    {
        [Required]
        public ICollection<ProblemsGroupRequest> Groups { get; set; } = new List<ProblemsGroupRequest>();

        [Required]
        public Guid CompetitionId { get; set; } = default!;
    }

    public sealed record class ProblemsGroupRequest
    {
        public ProblemsGroupRequest() { }

        public ProblemsGroupRequest(ProblemsGroup group)
        {
            Id = group.Id;
            ColorCode = group.ColorCode;
            CompetitionId = group.CompetitionId;
            Order = group.Order;
        }

        [Required]
        public Guid Id { get; set; }

        [Required]
        public string ColorCode { get; set; } = default!;

        [Required]
        public Guid CompetitionId { get; set; } = default;

        public int Order { get; set; }
    }
}
