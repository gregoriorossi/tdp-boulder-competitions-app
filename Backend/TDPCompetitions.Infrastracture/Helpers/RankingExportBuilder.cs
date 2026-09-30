using ClosedXML.Excel;
using TDPCompetitions.Infrastracture.Models;

namespace TDPCompetitions.Infrastracture.Helpers
{
    internal sealed class RankingExportBuilder
    {
        private const int HEADER_ROW = 1;

        private readonly XLWorkbook _workbook = new XLWorkbook();

        private RankingRow[]? _rows { get; set; }

        private readonly string[] Headers =
          {
                "Posizione",
                "Punteggio",
                "Cognome",
                "Nome"
            };

        public RankingExportBuilder SetData(IEnumerable<RankingRow> rows)
        {
            _rows = rows.ToArray();
            return this;
        }

        public MemoryStream? Build()
        {
            var worksheet = _workbook.Worksheets.Add("Classifica");
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
                var cell = worksheet.Cell(HEADER_ROW, i + 1);
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
                worksheet.Cell(rowNumber, 1).Value = row.Position;
                worksheet.Cell(rowNumber, 2).Value = row.Score;
                worksheet.Cell(rowNumber, 3).Value = row.LastName;
                worksheet.Cell(rowNumber, 4).Value = row.FirstName;
            }

            worksheet.Columns(1, Headers.Length).AdjustToContents(1, _rows.Length, 10, 40);
        }
    }
}
