using System.ComponentModel.DataAnnotations;

namespace TDPCompetitions.Api.ViewModels.Competitors
{
    public class RemoveSentProblemVM
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public Guid CompetitorId { get; set; }

        [Required]
        public Guid ProblemId { get; set; }

        [Required]
        public Guid CompetitionId { get; set; }
    }
}
