using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Api.ViewModels.Editors.Responses
{
    public sealed record RegistrationResponse(
        Guid Id,
        DateTime CreatedAt,
        string Email,
        Guid CompetitionId,
        CompetitorVM Competitor,
        IReadOnlyCollection<CompetitorVM> Minors)
    {
        public RegistrationResponse(Registration model)
            : this(
                model.Id,
                model.CreatedAt,
                model.Email,
                model.CompetitionId,
                new CompetitorVM(model.Competitor),
                model.Minors
                    .Select(m => new CompetitorVM(m))
                    .ToList())
        {}
    }
}
