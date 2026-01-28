using System.ComponentModel.DataAnnotations.Schema;

namespace TDPCompetitions.Core.Entities
{
    [Table("SentSpecialProblems")]
    public class SentSpecialProblem : BaseEntity<Guid>
    {
        public Guid CompetitionId { get; set; }

        public Guid AthleteId { get; set; }

        public Guid SpecialProblemId { get; set; }

        public DateTime SentAt { get; set; }
    }
}
