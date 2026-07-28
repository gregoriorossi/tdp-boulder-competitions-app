using System.ComponentModel.DataAnnotations;
using TDPCompetitions.Api.Attributes;

namespace TDPCompetitions.Api.ViewModels.Editors.Requests
{
    public sealed record class UpdateMinorRequest
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public required string FirstName { get; set; }

        [Required]
        public required string LastName { get; set; }

        [Required]
        [MinorAge(ErrorMessage = "The minor must be under 18 years old.")]
        public DateTime BirthDate { get; set; }

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
    }
}
