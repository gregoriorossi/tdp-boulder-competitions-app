using System.ComponentModel.DataAnnotations;

namespace TDPCompetitions.Api.ViewModels.Competitors
{
    public class AddRegistrationVM
    {
        [Required]
        public string FirstName { get; set; } = default!;

        [Required]
        public string LastName { get; set; } = default!;

        [Required]
        public DateTime BirthDate { get; set; }

        [Required]
        public string Email { get; set; } = default!;

        [Required]
        public int Gender { get; set; }

        public string BirthPlace { get; set; } = default!;

        public string BirthProvince { get; set; } = default!;

        public string AddressCity { get; set; } = default!;

        public string AddressProvince { get; set; } = default!;

        public string AddressStreet { get; set; } = default!;

        public string AddressNumber { get; set; } = default!;

        public string PhoneNumber { get; set; } = default!;

        public ICollection<MinorVM> Minors { get; set; } = [];
    }

    public class MinorVM
    {
        [Required]
        public string FirstName { get; set; } = default!;

        [Required]
        public string LastName { get; set; } = default!;

        [Required]
        public DateTime BirthDate { get; set; }

        [Required]
        public string Email { get; set; } = default!;

        [Required]
        public int Gender { get; set; }

        public string BirthPlace { get; set; } = default!;

        public string BirthProvince { get; set; } = default!;

        public string AddressCity { get; set; } = default!;

        public string AddressProvince { get; set; } = default!;

        public string AddressStreet { get; set; } = default!;

        public string AddressNumber { get; set; } = default!;
    }
}
