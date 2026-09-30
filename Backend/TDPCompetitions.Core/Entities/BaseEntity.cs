using System.ComponentModel.DataAnnotations;

namespace TDPCompetitions.Core.Entities
{
    public class BaseEntity<T>
    {
        [Key]
        public T Id { get; set; }
    }
}
