using System.ComponentModel.DataAnnotations.Schema;

namespace TDPCompetitions.Core.Entities;

[Table("SentSpecialProblems")]
public class SentSpecialProblem : BaseEntity<Guid>
{
    public Guid CompetitionId { get; set; }

    public Guid CompetitorId { get; set; }

    public Guid SpecialProblemId { get; set; }

    public DateTime SentAt { get; set; }

    public SentSpecialProblem() { }

    public SentSpecialProblem(Guid competitionId, Guid competitorId, Guid specialProblemId, DateTime sentAt)
    {
        CompetitionId = competitionId;
        CompetitorId = competitorId;
        SpecialProblemId = specialProblemId;
        SentAt = sentAt;
    }
}
