using System.ComponentModel.DataAnnotations.Schema;

namespace TDPCompetitions.Core.Entities
{
    [Table("SentProblems")]
    public class SentProblem : BaseEntity<Guid>
    {
        public Guid CompetitionId { get; set; }

        public Guid CompetitorId { get; set; }

        public Guid ProblemId { get; set; }

        public DateTime SentAt { get; set; }
    }
}
