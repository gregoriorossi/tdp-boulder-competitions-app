using System.ComponentModel.DataAnnotations.Schema;

namespace TDPCompetitions.Core.Entities
{
    [Table("Problems")]
    public class Problem : BaseEntity<Guid>
    {
        public string Name { get; set; } = default!;

        public Guid ProblemGroupId { get; set; }

        public ProblemGroup Group { get; set; } = default!;

        public Guid CompetitionId { get; set; } = default!;
    }
}
