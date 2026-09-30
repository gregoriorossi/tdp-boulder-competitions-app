
using System.ComponentModel.DataAnnotations.Schema;
using TDPCompetitions.Core.Enums;

namespace TDPCompetitions.Core.Entities
{
    [Table("Competitions")]
    public class Competition : BaseEntity<Guid>
    {
        public string Title { get; set; } = default!;

        public string Description { get; set; } = string.Empty;

        public string Slug { get; set; } = default!;

        public bool RegistrationsOpen { get; set; }

        public bool RankingsVisible { get; set; }

        public DateTime Date {  get; set; } = default!;

        public string EmailSubject { get; set; } = string.Empty;

        public string EmailText { get; set; } = string.Empty;

        public string PrivacyText { get; set; } = string.Empty;
        
        public Guid? PrivacyAttachmentId { get; set; } = default!;

        public File? PrivacyAttachment { get; set; } = default!;

        public CompetitionStatus Status { get; set; } = CompetitionStatus.DRAFT;

        public ICollection<Registration> Registrations { get; set; } = new List<Registration>();

        public ICollection<ProblemsGroup> ProblemGroups { get; set; } = new List<ProblemsGroup>();

        public ICollection<SpecialProblem> SpecialProblems { get; set; } = new List<SpecialProblem>();
    }
}
