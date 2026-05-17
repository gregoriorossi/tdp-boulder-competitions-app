using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Enums;

namespace TDPCompetitions.Core.Models
{
    public class RankingCompetitor
    {
        public int Position { get; set; }

        public double Score { get; set; }

        public Guid CompetitorId { get; set; }

        public string FirstName { get; set; } = default!;

        public string LastName { get; set; } = default!;

        public Gender Gender { get; set; }

        public bool IsMinor { get; set; }

        public RankingCompetitor(Competitor competitor, double score)
        {
            CompetitorId = competitor.Id;
            FirstName = competitor.FirstName;
            LastName = competitor.LastName; 
            Gender = competitor.Gender; 
            IsMinor = competitor.IsMinor;
            Score = score;
        }
    }
}
