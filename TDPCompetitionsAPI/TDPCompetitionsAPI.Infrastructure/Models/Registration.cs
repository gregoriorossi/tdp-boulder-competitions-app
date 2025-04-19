using System.ComponentModel.DataAnnotations.Schema;

namespace TDPCompetitionsAPI.Infrastructure.Models
{
    [Table("Registration")]
    public class Registration : BaseModel<int>
    {
        public string Name { get; set; } = string.Empty;

        public string Surname { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string AddressCity { get; set; } = string.Empty;

        public string AddressProvince { get; set; } = string.Empty;

        public string AddressStreet { get; set; } = string.Empty;

        public DateOnly BirthDate { get; set; }

        public string BirthCity { get; set; } = string.Empty;

        public string BirthProvince { get; set; } = string.Empty;

        public bool ConsentDownloaded { get; set; }

        public string TelephoneNumber {  get; set; } = string.Empty;

        public Gender Gender { get; set; }

        public List<Minor> Minors { get; set; } = new List<Minor>();

        public Competitor Competitor { get; set; }
    }
}
