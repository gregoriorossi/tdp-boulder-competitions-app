using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Enums;

namespace TDPCompetitions.Api.ViewModels.Editors.Responses;

public sealed record CompetitionInfoResponse(
    Guid Id,
    string Title,
    string Description,
    DateTime Date,
    string Slug,
    bool RegistrationsOpen,
    bool RankingsVisible,
    Guid? PrivacyAttachmentId,
    string PrivacyText,
    string EmailSubject,
    string EmailText,
    CompetitionStatus Status)
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
            competition.PrivacyAttachmentId,
            competition.PrivacyText,
            competition.EmailSubject,
            competition.EmailText,
            competition.Status)
    {}
}
