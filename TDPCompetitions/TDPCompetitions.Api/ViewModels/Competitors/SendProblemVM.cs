using System.ComponentModel.DataAnnotations;

namespace TDPCompetitions.Api.ViewModels.Competitors
{
    public class SendProblemVM
    {
        [Required]
        public Guid CompetitorId { get; set; }

        [Required]
        public Guid ProblemId { get; set; }

        [Required]
        public Guid CompetitionId { get; set; }
    }
}
