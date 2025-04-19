using System.ComponentModel.DataAnnotations;

namespace TDPCompetitionsAPI.Infrastructure.Models
{
    public class BaseModel<T>
    {
        [Key]
        public T Id { get; set; }

        public DateTime? EntryDate { get; set; }    

        public DateTime? UpdateDate { get; set; }
    }
}
