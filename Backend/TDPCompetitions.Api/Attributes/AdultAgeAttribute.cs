using System.ComponentModel.DataAnnotations;

namespace TDPCompetitions.Api.Attributes;

/// <summary>
/// Custom validation attribute to check if a person is an adult (18 years old or older).
/// </summary>
public class AdultAgeAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is DateTime birthDate)
        {
            var age = DateTime.Today.Year - birthDate.Year;

            if (birthDate > DateTime.Today.AddYears(-age)) age--;

            if (age >= 18)
            {
                return ValidationResult.Success;
            }
            else
            {
                return new ValidationResult(ErrorMessage ?? "The competitor must be 18 years old or older.");
            }
        }

        return ValidationResult.Success;
    }
}
