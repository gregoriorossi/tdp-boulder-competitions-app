using System.ComponentModel.DataAnnotations;

namespace TDPCompetitions.Api.ViewModels.Editors.Requests
{
    public class AddCompetitionRequest
    {
        [Required, StringLength(maximumLength: 100, MinimumLength = 5)]
        public string Title { get; set; } = default!;

        [Required]
        public DateTime Date { get; set; } = default!;
    }
}
