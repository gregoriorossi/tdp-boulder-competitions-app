using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Models;

namespace TDPCompetitions.Core.Interfaces.Services
{
    public interface IExportService
    {
        MemoryStream? CreateCompetitorsReport(ICollection<Registration> registrations);

        byte[] CreateWaiver(ICollection<Registration> registrations, Competition competition);

        MemoryStream? CreateRankingReport(ICollection<RankingCompetitor> registrations);
    }
}
