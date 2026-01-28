using System.ComponentModel.DataAnnotations.Schema;

namespace TDPCompetitions.Core.Entities
{
    [Table("Registrations")]
    public class Registration : BaseEntity<Guid>
    {
        public DateTime CreatedAt { get; set; }

        public string Email { get; set; } = default!;

        public Guid CompetitionId { get; set; }

        public Competition Competition { get; set; } = null!;
    }
}
