namespace TDPCompetitions.Api.ViewModels.Competitors.Responses.GetCompetitionAndRegistrationDataBySlug;

public sealed record GetCompetitionAndRegistrationDataBySlugResponse(
    RegistrationResponse Registration,
    CompetitionInfoResponse Competition);
