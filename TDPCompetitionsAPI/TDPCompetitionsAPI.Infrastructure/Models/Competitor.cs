using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TDPCompetitionsAPI.Infrastructure.Models
{
    [Table("Competitor")]
    public class Competitor
    {
        [Key]
        public string Id { get; set; }

        public Gender Gender { get; set; }

        public bool IsMinor { get; set; }
    }
}
