using System.ComponentModel.DataAnnotations;

namespace TDPCompetitions.Api.ViewModels.Editors
{
    public class AddProblemsToGroupVM
    {
        [Required]
        public Guid GroupId { get; set; }

        public ICollection<AddProblemsToGroupVMItem> Problems { get; set; } = new List<AddProblemsToGroupVMItem>();
    }

    public class AddProblemsToGroupVMItem
    {
        [Required]
        public string Name { get; set; } = default!;
    }
}
