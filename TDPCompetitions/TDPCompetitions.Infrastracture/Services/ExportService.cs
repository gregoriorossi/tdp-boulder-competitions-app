using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Interfaces.Services;
using TDPCompetitions.Infrastracture.Helpers;
using TDPCompetitions.Infrastracture.Models;

namespace TDPCompetitions.Infrastracture.Services
{
    public class ExportService : IExportService
    {
        public MemoryStream? CreateCompetitorsReport(ICollection<Registration> registrations)
        {
            List<CompetitorsReportRow> rows = registrations.SelectMany(registration =>
                new[] { new CompetitorsReportRow(registration.Competitor, registration) }
                .Concat(registration.Minors.Select(m => new CompetitorsReportRow(m, registration)))
                )
                .OrderBy(r => r.LastName)
                .ThenBy(r => r.FirstName)
                .ToList();

            var result = new CompetitorsExportBuilder()
                .SetData(rows)
                .Build();
                
            return result;
        }
    }
}
