using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Infrastracture.Models
{
    public sealed record LiberatoriaModel
    {
        public string CompetitionName { get; init; }
        public string Surname { get; init; }
        public string Name { get; init; }
        public string BirthPlace { get; init; }
        public string BirthProvince { get; init; }
        public DateTime BirthDate { get; init; }
        public string AddressCity { get; init; }
        public string AddressStreet { get; init; }
        public string AddressNumber { get; init; }
        public string AddressProvince { get; init; }
        public string Email { get; init; }

        public LiberatoriaModel(Registration registration, string competitionName)
        {
            var competitor = registration.Competitor;

            CompetitionName = competitionName;
            Surname = competitor.LastName;
            Name = competitor.FirstName;
            BirthPlace = competitor.BirthPlace;
            BirthProvince = competitor.BirthProvince;
            BirthDate = competitor.BirthDate;
            AddressCity = competitor.AddressCity;
            AddressStreet = competitor.AddressStreet;
            AddressNumber = competitor.AddressNumber;
            AddressProvince = competitor.AddressProvince;
            Email = registration.Email;
        }
    }

}
