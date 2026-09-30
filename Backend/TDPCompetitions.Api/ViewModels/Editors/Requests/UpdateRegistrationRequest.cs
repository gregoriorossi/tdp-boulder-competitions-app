using System.ComponentModel.DataAnnotations;
using TDPCompetitions.Api.Attributes;

namespace TDPCompetitions.Api.ViewModels.Editors.Requests;

public class UpdateRegistrationRequest
{
    [Required]
    public required Guid Id { get; set; }

    [Required]
    public required string FirstName { get; set; }

    [Required]
    public required string LastName { get; set; }

    [Required]
    [AdultAge(ErrorMessage = "The competitor must be 18 years old or older.")]
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

    [Required]
    public required bool GuardianOnly { get; set; }
}
