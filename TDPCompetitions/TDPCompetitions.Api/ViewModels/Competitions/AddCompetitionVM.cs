using System.ComponentModel.DataAnnotations;

namespace TDPCompetitions.Api.ViewModels.Competitions
{
    public class AddCompetitionVM
    {
        [Required, StringLength(maximumLength: 100, MinimumLength = 5)]
        public string Title { get; set; } = default!;
    }
}
