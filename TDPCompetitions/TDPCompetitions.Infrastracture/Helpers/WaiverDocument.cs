using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using TDPCompetitions.Infrastracture.Models;
using Colors = QuestPDF.Helpers.Colors;

namespace TDPCompetitions.Api.Helpers
{
    public sealed class WaiverDocument : IDocument
    {
        private readonly IEnumerable<LiberatoriaModel> _models;
        private readonly byte[] _logo;

        public WaiverDocument(IEnumerable<LiberatoriaModel> models, byte[] logo)
        {
            _models = models;
            _logo = logo;
        }

        public DocumentMetadata GetMetadata() => new()
        {
            Title = "Teste di Pietra - Liberatoria"
        };

        public void Compose(IDocumentContainer container)
        {
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.MarginTop(15);
                page.MarginRight(20);
                page.MarginLeft(15);
                page.MarginBottom(15);
                page.DefaultTextStyle(TextStyle.Default
                    .FontSize(10)
                    .FontFamily("Verdana")
                );

                page.Content().Column(col =>
                {
                    col.Spacing(12);
                    foreach (var model in _models)
                    {
                        ComposeTopHeader(col, model.CompetitionName);
                        ComposeAnagrafica(col, model);
                        ComposeDichiarazione(col);
                        ComposeFirma(col);

                        ComposeInoltre(col);
                        ComposeConsenso(col);
                        ComposeFirma(col);

                        col.Item().PageBreak();
                    }
                });
            });
        }

        private void ComposeTopHeader(ColumnDescriptor col, string competitionName)
        {
            col.Item().AlignRight().Text($"ATLETA N° ........")
                .FontSize(15)
                .Bold();

            // Intestazione con logo + testo centrato bold
            col.Item().Row(row =>
            {
                row.ConstantItem(70).Height(60).AlignMiddle()
                   .Image(_logo).FitArea();

                row.RelativeItem().AlignMiddle().AlignCenter().Text(t =>
                {
                    t.Line("Associazione Sportiva Dilettantistica Teste di Pietra").Bold().FontSize(12);
                    t.Line("Dichiarazione liberatoria").Bold().FontSize(12);
                    t.Line(competitionName).Bold().FontSize(12);
                });
            });
        }

        private void ComposeAnagrafica(ColumnDescriptor col, LiberatoriaModel model)
        {
            col.Item().Row(row =>
            {
                row.RelativeItem().Text("Il/La sottoscritto/a:").Bold().FontSize(10);
                row.RelativeItem().AlignRight().Text("*si prega di scrivere in stampatello")
                    .Italic().FontSize(10);
            });

            col.Item().Row(row =>
            {
                row.RelativeItem().Element(c => FieldInline(c, "Cognome", model.Surname));
                row.RelativeItem().Element(c => FieldInline(c, "Nome", model.Name));
            });

            // Nato a / Prov + data
            col.Item().Row(row =>
            {
                row.RelativeItem().Element(c => FieldInline(c, "Nato/a a", model.BirthPlace));
                row.RelativeItem().Element(c =>
                {
                    c.Row(r =>
                    {
                        r.RelativeItem().Element(x => FieldInline(x, "Prov.", model.BirthProvince));
                        r.RelativeItem().Element(x => FieldInline(x, "il ", model.BirthDate.ToString("dd-MM-yyyy")));
                    });
                });
            });

            col.Item().Row(row =>
            {
                row.RelativeItem().Element(c => FieldInline(c, "Residente a", model.AddressCity));
                row.RelativeItem().Element(c =>
                {
                    c.Row(r =>
                    {
                        row.RelativeItem().Element(c => FieldInline(c, "Indirizzo ", $"{model.AddressStreet} n°{model.AddressNumber}"));
                        row.RelativeItem().Element(c => FieldInline(c, "Prov.", model.AddressProvince));
                    });
                });
            });

            col.Item().Row(row =>
            {
                row.RelativeItem().Element(c => FieldInline(c, "Email", model.Email));
            });
        }

        private void ComposeDichiarazione(ColumnDescriptor col)
        {
            col.Item().PaddingTop(10).Text("Dichiara sotto la propria responsabilità di:")
                .Bold()
                .AlignCenter();

            // Paragrafo 1 (testo lungo)
            col.Item().Text(
                "Essere un arrampicatore esperto e solleva l'associazione A.S.D. Teste di Pietra da qualsiasi responsabilità " +
                "per tutti i danni eventualmente cagionati, a me stesso o a terzi, derivanti dalla mia partecipazione all'evento " +
                "\"BOULDER MEETING\"."
            )
            .AlignLeft(); // se vuoi justify e hai QuestPDF recente, dimmi versione e lo impostiamo [4](https://github.com/QuestPDF/QuestPDF/issues/159)

            // Riga sottolineata
            col.Item().Text("D.Lgs 30/06/2003 n.196 Tutela delle persone e di altri soggetti rispetto il trattamento dei dati personali.")
                .Underline()
                .AlignLeft();

            // Paragrafo privacy lungo
            col.Item().Text(
                "Ai sensi dell'art. 13 del D.Lgs. 196 del 30/06/2003 Vi informiamo che i Vs. dati personali sono e verranno da noi trattati " +
                "ed inseriti in una banca dati, essendoci indispensabile per il corretto svolgimento dei nostri rapporti. Tutti i dati suddetti " +
                "finora raccolti, nonchè quelli che saranno in futuro raccolti verranno trattati sia in forma cartacea che con strumenti " +
                "informatici e/o telematici, in modo lecito e per finalità di legge connessi a norme civilistiche, fiscali, contabili, etc. e " +
                "gestione del rapporto associativo. Informiamo inoltre che il titolare dei dati personali a norma di legge è l'Associazione " +
                "Sportiva Dilettantistica Teste di Pietra con sede in Cavasso Nuovo (PN) Via Borgo Zamboni, 11."
            )
            .AlignLeft();
        }

        private void ComposeFirma(ColumnDescriptor col)
        {
            col.Item().PaddingTop(10).Row(row =>
            {
                row.RelativeItem().Text("Vivaro, li ..../...../...........");
                row.RelativeItem().AlignRight().Text("Firma: ....................................................");
            });
        }

        private void ComposeInoltre(ColumnDescriptor col)
        {
            col.Item().PaddingTop(10).AlignCenter().Text("INOLTRE").Bold();

            col.Item().Text(
                "A titolo gratuito, senza limiti di tempo, anche ai sensi degli artt. 10 e 320 cod. civ. e degli artt. 96 e 97 legge 22.4.1941, n. " +
                "633, Legge sul diritto d’autore, alla pubblicazione e/o diffusione in qualsiasi forma delle proprie immagini sul sito internet " +
                "della Società/Ente A.S.D. TESTE DI PIETRA, sui canali social istituzionali (Facebook, Twitter, Youtube, ecc...) e/o su qualsiasi " +
                "altro mezzo di diffusione, nonché autorizza la conservazione dei video stessi negli archivi informatici della Società/Ente e " +
                "prende atto che la finalità di tali pubblicazioni sono meramente di carattere informativo ed eventualmente promozionale."
            )
            .AlignLeft();

            col.Item().Text(
                "La presente liberatoria/autorizzazione potrà essere revocata in ogni tempo con comunicazione scritta da inviare via posta comune o e-mail."
            )
            .AlignLeft();
        }

        private void ComposeConsenso(ColumnDescriptor col)
        {
            col.Item().PaddingTop(10).Row(row =>
            {
                row.RelativeItem().AlignCenter().Row(r =>
                {
                    r.AutoItem().Element(ConsentBox);
                    r.AutoItem().Text("  Presto il consenso");
                });

                row.RelativeItem().AlignCenter().Row(r =>
                {
                    r.AutoItem().Element(ConsentBox);
                    r.AutoItem().Text("  Nego il consenso");
                });
            });
        }

        private static void FieldInline(IContainer container, string label, string value)
        {
            container.Text(t =>
            {
                t.Span(label).FontSize(10);
                t.Span(" ").FontSize(10);
                t.Span(value ?? string.Empty).FontSize(11);
            });
        }

        private static void ConsentBox(IContainer container)
        {
            container
                .Width(10).Height(10)
                .Border(1)
                .BorderColor(Colors.Black);
        }
    }
}
