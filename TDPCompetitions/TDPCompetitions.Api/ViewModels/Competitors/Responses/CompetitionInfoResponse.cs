using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Api.ViewModels.Competitors.Responses;

public sealed record CompetitionInfoResponse(
       Guid Id,
       string Title,
       string Description,
       DateTime Date,
       string Slug,
       bool RegistrationsOpen,
       int Status,
       Guid? BannerImageId)
{
    public CompetitionInfoResponse(Competition competition)
        : this(
            competition.Id,
            competition.Title,
            competition.Description,
            competition.Date,
            competition.Slug,
            competition.RegistrationsOpen,
            (int)competition.Status,
            competition.BannerImageId)
    { }
}
