using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Api.ViewModels.Competitors.Responses.GetCompetitionAndRegistrationDataBySlug;

public sealed record RegistrationResponse(
        Guid Id,
        DateTime CreatedAt,
        string Email,
        Guid CompetitionId,
        CompetitorVM Competitor,
        string PhoneNumber,
        IReadOnlyCollection<CompetitorVM> Minors)
{
    public RegistrationResponse(Registration model)
        : this(
            model.Id,
            model.CreatedAt,
            model.Email,
            model.CompetitionId,
            new CompetitorVM(model.Competitor),
            model.PhoneNumber,
            model.Minors
                .Select(m => new CompetitorVM(m))
                .ToList())
    { }
}
