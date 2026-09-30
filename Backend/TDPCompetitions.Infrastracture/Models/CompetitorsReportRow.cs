using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Enums;

namespace TDPCompetitions.Infrastracture.Models
{
    internal record CompetitorsReportRow
    {
        public string FirstName { get; init; } = default!;

        public string LastName { get; init; } = default!;

        public string Email { get; init; } = default!;

        public DateTime BirthDate { get; init; } = default!;

        public Gender Gender { get; init; } = default!;

        public string BirthPlace { get; init; } = default!;

        public string BirthProvince { get; init; } = default!;

        public string AddressCity { get; init; } = default!;

        public string AddressProvince { get; init; } = default!;

        public string AddressStreet { get; init; } = default!;

        public string AddressNumber { get; init; } = default!;

        public string PhoneNumber { get; init; } = default!;

        public bool IsMinor { get; init; } = default!;

        public string Tutor { get; init; } = default!;

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
            PhoneNumber = registration.PhoneNumber;
            IsMinor = competitor.IsMinor;
            RegisteredAt = registration.CreatedAt;
        }

        public CompetitorsReportRow(Competitor competitor, Registration registration, Competitor tutor)
            : this(competitor, registration)
        {
            Tutor = $"{tutor.FirstName} {tutor.LastName}";
        }
    }
}
