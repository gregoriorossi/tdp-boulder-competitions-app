using System.ComponentModel.DataAnnotations.Schema;
using TDPCompetitions.Core.Enums;

namespace TDPCompetitions.Core.Entities;

[Table("Competitors")]
public class Competitor : BaseEntity<Guid>
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

    public bool IsMinor { get; set; }

    public Guid CompetitionId { get; set; }

    public Competition Competition { get; set; } = default!;

    public Guid? RegistrationId { get; set; }

    public bool GuardianOnly { get; set; }

    public Registration? Registration { get; set; }

    public void Update(Competitor competitor)
    {
        AddressCity = competitor.AddressCity;
        AddressNumber = competitor.AddressNumber;
        AddressStreet = competitor.AddressStreet;
        AddressProvince = competitor.AddressProvince;
        BirthPlace = competitor.BirthPlace;
        BirthDate = competitor.BirthDate;
        BirthProvince = competitor.BirthProvince;
        Gender = competitor.Gender;
        FirstName = competitor.FirstName;
        LastName = competitor.LastName;
        GuardianOnly = competitor.GuardianOnly;
    }
}
