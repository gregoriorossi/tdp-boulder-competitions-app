using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Api.ViewModels
{
    public class RegistrationVM
    {
        public Guid Id { get; set; }

        public DateTime CreatedAt { get; set; }

        public string Email { get; set; } = default!;

        public Guid CompetitionId { get; set; }

        public CompetitorVM Competitor { get; set; }

        public ICollection<CompetitorVM> Minors { get; set; } = new List<CompetitorVM>();

        public RegistrationVM(Registration model) {
            Id = model.Id;
            CreatedAt = model.CreatedAt;
            Email = model.Email;
            CompetitionId = model.CompetitionId;
            Competitor= new CompetitorVM(model.Competitor);
            Minors = model.Minors.Select(m => new CompetitorVM(m)).ToList();
        }
    }
}
