using System.ComponentModel.DataAnnotations;

namespace TDPCompetitionsAPI.Web.ViewModels
{
    public class CreateCompetitionViewModel
    {
        [Required, StringLength(maximumLength: 100, MinimumLength = 5)]
        public string Title { get; set; }
        [Required]
        public DateTime Date { get; set; }
    }
}
