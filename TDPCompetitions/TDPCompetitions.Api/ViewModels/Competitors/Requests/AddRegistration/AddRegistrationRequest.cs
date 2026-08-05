using System.ComponentModel.DataAnnotations;

namespace TDPCompetitions.Api.ViewModels.Competitors.Requests.AddRegistration
{
    public record class AddRegistrationRequest
    {
        [Required]
        public required string FirstName { get; set; }

        [Required]
        public required string LastName { get; set; }

        [Required]
        public DateTime BirthDate { get; set; }

        [Required]
        public required string Email { get; set; }

        [Required]
        public required int Gender { get; set; }

        [Required]
        public required string BirthPlace { get; set; }

        [Required]
        public required string BirthProvince { get; set; }

        [Required]
        public required string AddressCity { get; set; }

        [Required]
        public required string AddressProvince { get; set; }

        [Required]
        public required string AddressStreet { get; set; }

        [Required]
        public required string AddressNumber { get; set; }

        [Required]
        public required string PhoneNumber { get; set; } = default!;

        public ICollection<Minor> Minors { get; set; } = [];
    }
}
