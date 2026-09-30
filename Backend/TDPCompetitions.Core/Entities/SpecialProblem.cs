using System.ComponentModel.DataAnnotations.Schema;

namespace TDPCompetitions.Core.Entities
{
    [Table("SpecialProblems")]
    public class SpecialProblem : BaseEntity<Guid>
    {
        public string Name { get; set; } = default!;

        public Guid CompetitionId { get; set; }

        public Competition Competition { get; set; } = default!;
    }
}
