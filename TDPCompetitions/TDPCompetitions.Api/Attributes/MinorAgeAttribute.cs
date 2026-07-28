using System.ComponentModel.DataAnnotations;

namespace TDPCompetitions.Api.Attributes;

/// <summary>
/// Custom validation attribute to check if a person is a minor (under 18 years old).
/// </summary>
public class MinorAgeAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is DateTime birthDate)
        {
            var age = DateTime.Today.Year - birthDate.Year;

            if (birthDate > DateTime.Today.AddYears(-age)) age--;

            if (age >= 18)
            {
                return new ValidationResult(ErrorMessage ?? "The competitor must be under 18 years old.");
            }
        }

        return ValidationResult.Success;
    }
}
