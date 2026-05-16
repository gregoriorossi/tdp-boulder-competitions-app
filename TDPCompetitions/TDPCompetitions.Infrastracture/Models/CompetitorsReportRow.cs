using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Enums;

namespace TDPCompetitions.Infrastracture.Models
{
    internal record CompetitorsReportRow
    {
        public string FirstName { get; init; } = default!;

        public string LastName { get; init; } = default!;

        public string Email { get; init; } = default!;

        public DateTime BirthDate { get; init; }

        public Gender Gender { get; init; }

        public string BirthPlace { get; init; } = default!;

        public string BirthProvince { get; init; } = default!;

        public string AddressCity { get; init; } = default!;

        public string AddressProvince { get; init; } = default!;

        public string AddressStreet { get; init; } = default!;

        public string AddressNumber { get; init; } = default!;

        public string PhoneNumber { get; init; } = default!;

        public bool IsMinor { get; init; }

        public DateTime RegisteredAt { get; init; } = default!;

        public CompetitorsReportRow(Competitor competitor, Registration registration)
        {
            Email = registration.Email;
            FirstName = competitor.FirstName;
            LastName = competitor.LastName;
            BirthDate = competitor.BirthDate;
            Gender = competitor.Gender;
            BirthPlace = competitor.BirthPlace;
            BirthProvince = competitor.BirthProvince;
            AddressCity = competitor.AddressCity;
            AddressProvince = competitor.AddressProvince;
            AddressStreet = competitor.AddressStreet;
            AddressNumber = competitor.AddressNumber;
            PhoneNumber = competitor.PhoneNumber;
            IsMinor = competitor.IsMinor;
            RegisteredAt = registration.CreatedAt;
        }
    }
}
