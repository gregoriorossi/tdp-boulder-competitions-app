using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Core.Interfaces.Services
{
    public interface IExportService
    {
        MemoryStream? CreateCompetitorsReport(ICollection<Registration> registrations);
    }
}
