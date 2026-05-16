using ClosedXML.Excel;
using TDPCompetitions.Core.Enums;
using TDPCompetitions.Infrastracture.Models;

namespace TDPCompetitions.Infrastracture.Helpers
{
    internal sealed class CompetitorsExportBuilder
    {
        private const int HEADER_ROW = 1;

        private readonly XLWorkbook _workbook = new XLWorkbook();

        private CompetitorsReportRow[]? _rows { get; set; }

        private readonly string[] Headers =
           {
                "Cognome",
                "Nome",
                "Email",
                "Data di nascita",
                "Genere",
                "Luogo di nascita",
                "Provincia di nascita",
                "Indirizzo",
                "Numero di telefono",
                "Minore",
                "Data di registrazione"
            };

        public CompetitorsExportBuilder SetData(IEnumerable<CompetitorsReportRow> rows)
        {
            _rows = rows.ToArray();
            return this;
        }

        public MemoryStream? Build()
        {
            var worksheet = _workbook.Worksheets.Add("Partecipanti");
            SetHeader(worksheet);
            InsertData(worksheet);

            using var stream = new MemoryStream();
            _workbook.SaveAs(stream);

            return stream;
        }

        private void SetHeader(IXLWorksheet worksheet)
        {
            for (int i = 0; i < Headers.Length; i++)
            {
                var cell = worksheet.Cell(HEADER_ROW, i+1);
                cell.Value = Headers[i];
            }

            var headerRange = worksheet.Range(HEADER_ROW, 1, HEADER_ROW, Headers.Length);
            headerRange.Style.Font.Bold = true;
            worksheet.SheetView.FreezeRows(HEADER_ROW);
        }

        private void InsertData(IXLWorksheet worksheet)
        {
            if (_rows == null)
            {
                throw new InvalidOperationException("Data not set in Competitors Export Builder");
            }

            for (int i = 0; i < _rows.Count(); i++)
            {
                var row = _rows[i];
                int rowNumber = HEADER_ROW + i + 1;
                worksheet.Cell(rowNumber, 1).Value = row.LastName;
                worksheet.Cell(rowNumber, 2).Value = row.FirstName;
                worksheet.Cell(rowNumber, 3).Value = row.Email;

                var birthDateCell = worksheet.Cell(rowNumber, 4);
                birthDateCell.Value = row.BirthDate;
                birthDateCell.Style.DateFormat.Format = "dd/MM/yyyy";


                worksheet.Cell(rowNumber, 5).Value = row.Gender == Gender.MALE ? "Uomo" : "Donna";
                worksheet.Cell(rowNumber, 6).Value = row.BirthPlace;
                worksheet.Cell(rowNumber, 7).Value = row.BirthProvince;
                worksheet.Cell(rowNumber, 8).Value = $"{row.AddressStreet}, {row.AddressNumber}, {row.AddressCity} ({row.AddressProvince})";
                worksheet.Cell(rowNumber, 9).Value = row.PhoneNumber;
                worksheet.Cell(rowNumber, 10).Value = row.IsMinor ? "Sì": "No";

                var registrationDateCell = worksheet.Cell(rowNumber, 11);
                registrationDateCell.Value = row.RegisteredAt;
                registrationDateCell.Style.DateFormat.Format = "dd/MM/yyyy";
            }

            worksheet.Columns(1, Headers.Length).AdjustToContents(1, _rows.Length, 10, 40);
        }
    }
}
