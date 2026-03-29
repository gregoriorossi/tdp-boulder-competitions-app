using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Enums;

namespace TDPCompetitions.Api.ViewModels
{
    public class CompetitorVM
    {
        public string FirstName { get; set; } = default!;

        public string LastName { get; set; } = default!;

        public DateTime BirthDate { get; set; }

        public Gender Gender { get; set; }

        public string BirthPlace { get; set; } = default!;

        public string BirthProvince { get; set; } = default!;

        public string AddressCity { get; set; } = default!;

        public string AddressProvince { get; set; } = default!;

        public string AddressStreet { get; set; } = default!;

        public string AddressNumber { get; set; } = default!;

        public string PhoneNumber { get; set; } = default!;

        public bool IsMinor { get; set; }

        public Guid CompetitionId { get; set; }

        public Guid RegistrationId { get; set; }

        public CompetitorVM(Competitor competitor)
        {
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
            CompetitionId = competitor.CompetitionId;
            RegistrationId = competitor.RegistrationId;
        }
    }
}
