using System.ComponentModel.DataAnnotations;
using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Api.ViewModels.Editors
{
    public class UpdateProblemsGroupsVM
    {
        [Required]
        public ICollection<ProblemsGroupVM> Groups { get; set; } = new List<ProblemsGroupVM>();

        [Required]
        public Guid CompetitionId { get; set; } = default!;
    }

    public class ProblemsGroupVM
    {
        public ProblemsGroupVM() { }
        
        public ProblemsGroupVM(ProblemsGroup group)
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
