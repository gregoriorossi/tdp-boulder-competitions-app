using System.ComponentModel.DataAnnotations.Schema;

namespace TDPCompetitions.Core.Entities
{
    [Table("ProblemsGroups")]
    public class ProblemsGroup : BaseEntity<Guid>
    {
        public int Order { get; set; }

        public string ColorCode { get; set; } = default!;

        public Guid CompetitionId { get; set; }

        public Competition Competition { get; set; } = default!;

        public ICollection<Problem> Problems { get; set;} = new List<Problem>();
    }
}
