using System.ComponentModel.DataAnnotations.Schema;
using TDPCompetitions.Core.Enums;

namespace TDPCompetitions.Core.Entities
{
    [Table("Competitors")]
    public class Competitor : BaseEntity<Guid>
    {
        public string FirstName { get; set; } = default!;

        public string LastName { get; set; } = default!;

        public DateTime BirthDate { get; set; }

        public Gender Gender { get; set; }

        public string BirthPlace { get; set; } = default!;

        public string BirthProvince { get; set; } = default!;

        public string AddressCity { get; set; } = default!;

        public string AddressProvince { get; set; } = default!;

        public string AddressStreet { get; set; } = default!;

        public string AddressNumber { get; set; } = default!;

        public string PhoneNumber { get; set; } = default!;

        public bool IsMinor { get; set; }

        public Guid CompetitionId { get; set; }

        public Competition Competition { get; set; } = default!;

        public Guid RegistrationId { get; set; }

        public Registration Registration { get; set; } = default!;
    }
}
