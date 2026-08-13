using System.ComponentModel.DataAnnotations;
using TDPCompetitions.Api.Attributes;

namespace TDPCompetitions.Api.ViewModels.Competitors.Requests.AddRegistration;

public sealed record class Minor
{
    [Required]
    public required string FirstName { get; set; } = default!;

    [Required]
    public required string LastName { get; set; } = default!;

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
