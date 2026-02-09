using System.ComponentModel.DataAnnotations;

namespace TDPCompetitions.Api.ViewModels.Competitors
{
    public class RemoveSentSpecialProblemVM
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public Guid CompetitorId { get; set; }

        [Required]
        public Guid SpecialProblemId { get; set; }

        [Required]
        public Guid CompetitionId { get; set; }
    }
}
