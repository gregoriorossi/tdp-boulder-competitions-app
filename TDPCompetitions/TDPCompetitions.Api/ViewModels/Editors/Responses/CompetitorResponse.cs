using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Enums;

namespace TDPCompetitions.Api.ViewModels.Editors.Responses;

public sealed record CompetitorResponse(
    Guid Id,
    string FirstName,
    string LastName,
    DateTime BirthDate,
    Gender Gender,
    string BirthPlace,
    string BirthProvince,
    string AddressCity,
    string AddressProvince,
    string AddressStreet,
    string AddressNumber,
    string PhoneNumber,
    bool IsMinor,
    Guid CompetitionId,
    Guid RegistrationId)
{
    public CompetitorResponse(Competitor competitor)
        : this(
            competitor.Id,
            competitor.FirstName,
            competitor.LastName,
            competitor.BirthDate,
            competitor.Gender,
            competitor.BirthPlace,
            competitor.BirthProvince,
            competitor.AddressCity,
            competitor.AddressProvince,
            competitor.AddressStreet,
            competitor.AddressNumber,
            competitor.PhoneNumber,
            competitor.IsMinor,
            competitor.CompetitionId,
            competitor.RegistrationId)
    {
    }
}

