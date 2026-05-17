using QuestPDF.Fluent;
using TDPCompetitions.Api.Helpers;
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

        public byte[] CreateWaiver(ICollection<Registration> registrations, Competition competition)
        {
            var logo = GetLogo();
            var models = registrations.Select(r => new LiberatoriaModel(r, competition.Title));
            var doc = new WaiverDocument(models, logo);
            var result = doc.GeneratePdf();

            return result;
        }

        private byte[] GetLogo()
        {
            var baseDir = AppContext.BaseDirectory;
            var logoPath = Path.Combine(baseDir, "Assets", "teste-di-pietra-logo.png");

            var logoBytes = System.IO.File.ReadAllBytes(logoPath);
            return logoBytes;
        }
    }
}
