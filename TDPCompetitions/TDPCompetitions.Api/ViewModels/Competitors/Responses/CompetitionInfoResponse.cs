using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Api.ViewModels.Competitors.Responses;

public sealed record CompetitionInfoResponse(
       Guid Id,
       string Title,
       string Description,
       DateTime Date,
       string Slug,
       bool RegistrationsOpen,
       bool RankingsVisible,
       int Status,
       Guid? PrivacyAttachmentId,
       string PrivacyText)
{
    public CompetitionInfoResponse(Competition competition)
        : this(
            competition.Id,
            competition.Title,
            competition.Description,
            competition.Date,
            competition.Slug,
            competition.RegistrationsOpen,
            competition.RankingsVisible,
            (int)competition.Status,
            competition.PrivacyAttachmentId,
            competition.PrivacyText)
    { }
}
