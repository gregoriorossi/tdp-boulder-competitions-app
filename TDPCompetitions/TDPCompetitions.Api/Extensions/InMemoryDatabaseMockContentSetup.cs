using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Enums;
using TDPCompetitions.Infrastracture.Data;

namespace TDPCompetitions.Api.Extensions
{
    public static class InMemoryDatabaseMockContentSetup
    {
        public static void AddInMemoryDatabaseMockContent(this WebApplication app)
        {
            var mockDatabaseScope = app.Services.CreateScope();
            var context = mockDatabaseScope.ServiceProvider.GetRequiredService<AppDbContext>();

            var competition1 = new Competition
            {
                Id = Guid.Parse("b7c2b3a8-8c1b-4f8a-a1d4-0d0c7c9d5f01"),
                Title = "Trieste Boulder Cup 2023",
                Description = "Competizione regionale di boulder con qualifiche al mattino e finali serali. Categorie U16, U20 e Senior.",
                Slug = "trieste-boulder-cup-2023",
                BannerImageId = null,
                BannerImage = null,
                RegistrationsOpen = false,
                Date = new DateTime(2023, 9, 30, 18, 0, 0, DateTimeKind.Local),
                EmailText = "Grazie per aver partecipato alla Trieste Boulder Cup 2023. Risultati e foto saranno inviati via email ai partecipanti.",
                PrivacyAttachmentId = null,
                PrivacyAttachment = null,
                Status = CompetitionStatus.CLOSED,
                Registrations = [],
                ProblemGroups = [],
                SpecialProblems = []
            };
            var competition2 = new Competition
            {
                Id = Guid.Parse("4b6f1e9a-1de2-4a2a-bb21-9a3f7db6a4c2"),
                Title = "Alpine Lead Masters 2024",
                Description = "Gara lead su vie di difficoltà progressiva. Qualifiche a vista, finale su via unica.",
                Slug = "alpine-lead-masters-2024",
                BannerImageId = null,
                BannerImage = null,
                RegistrationsOpen = false,
                Date = new DateTime(2024, 5, 18, 10, 0, 0, DateTimeKind.Local),
                EmailText = "Grazie per aver preso parte all’Alpine Lead Masters 2024. Invieremo classifiche ufficiali e highlight video.",
                PrivacyAttachmentId = null,
                PrivacyAttachment = null,
                Status = CompetitionStatus.CLOSED,
                Registrations = [],
                ProblemGroups = [],
                SpecialProblems = []
            };

            var competition3 = new Competition
            {
                Id = Guid.Parse("c3e7c1f4-2d41-4b6e-9c61-7c2e6f234d55"),
                Title = "Adriatic Speed Challenge 2025",
                Description = "Competizione speed su standard 15m, qualifiche a tempo e scontri diretti in finale.",
                Slug = "adriatic-speed-challenge-2025",
                BannerImageId = null,
                BannerImage = null,
                RegistrationsOpen = false,
                Date = new DateTime(2025, 10, 14, 15, 0, 0, DateTimeKind.Local),
                EmailText = "Grazie per la partecipazione all’Adriatic Speed Challenge 2025. Tempi e ranking saranno condivisi via email.",
                PrivacyAttachmentId = null,
                PrivacyAttachment = null,
                Status = CompetitionStatus.OPEN,
                Registrations = [],
                ProblemGroups = [],
                SpecialProblems = []
            };

            var competition4 = new Competition
            {
                Id = Guid.Parse("8d2a0f1b-bd3f-4bb0-9f4b-6d2f1a6c0b99"),
                Title = "Karst Mixed Climbing Open 2026",
                Description = "Evento indoor con round misto: boulder al mattino e lead nel pomeriggio. Finale combinata.",
                Slug = "karst-mixed-climbing-open-2026",
                BannerImageId = null,
                BannerImage = null,
                RegistrationsOpen = true,
                Date = new DateTime(2026, 1, 20, 9, 30, 0, DateTimeKind.Local),
                EmailText = "Grazie per aver partecipato al Karst Mixed Climbing Open 2026. A breve invieremo risultati e photogallery.",
                PrivacyAttachmentId = null,
                PrivacyAttachment = null,
                Status = CompetitionStatus.DRAFT,
                Registrations = [],
                ProblemGroups = [],
                SpecialProblems = []
            };

            // Assumo che la data gara sia 20/01/2026 (dal tuo esempio precedente).
            // Tutti i minorenni sotto i 18 anni a tale data.
            var competitionId = competition4.Id;

            // ---------- REGISTRAZIONE 1 ----------
            var reg1Id = Guid.Parse("a9f8b2a1-6a84-4d3e-9c9e-1a7d2e1c0a11");
            var adult1Id = Guid.Parse("1c4e8b82-2d0d-4c1c-9b2c-2f3e9b6a1a01");
            var m11Id = Guid.Parse("3f0a9c15-33ac-4c63-8f2e-2a1f9e5b1011");
            var m12Id = Guid.Parse("5a9f2c77-4a4f-4e93-8c4a-6e2a1f9b2012");

            var adult1 = new Competitor
            {
                Id = adult1Id,
                FirstName = "Luca",
                LastName = "Bianchi",
                BirthDate = new DateTime(1991, 6, 12),
                Gender = Gender.MALE,
                BirthPlace = "Trieste",
                BirthProvince = "TS",
                AddressCity = "Trieste",
                AddressProvince = "TS",
                AddressStreet = "Via Carducci",
                AddressNumber = "12",
                PhoneNumber = "+39 345 1111111",
                IsMinor = false,
                CompetitionId = competitionId,
                RegistrationId = reg1Id,
                Competition = null!,    // popolerai via EF
                Registration = null!    // back-ref impostata sotto
            };

            var minor11 = new Competitor
            {
                Id = m11Id,
                FirstName = "Giulia",
                LastName = "Bianchi",
                BirthDate = new DateTime(2011, 9, 5),   // 14 anni a 01/2026
                Gender = Gender.FEMALE,
                BirthPlace = "Trieste",
                BirthProvince = "TS",
                AddressCity = "Trieste",
                AddressProvince = "TS",
                AddressStreet = "Via Carducci",
                AddressNumber = "12",
                PhoneNumber = "+39 345 1111112",
                IsMinor = true,
                CompetitionId = competitionId,
                RegistrationId = reg1Id,
                Competition = null!,
                Registration = null!
            };

            var minor12 = new Competitor
            {
                Id = m12Id,
                FirstName = "Andrea",
                LastName = "Bianchi",
                BirthDate = new DateTime(2010, 2, 20),  // 15 anni a 01/2026
                Gender = Gender.MALE,
                BirthPlace = "Trieste",
                BirthProvince = "TS",
                AddressCity = "Trieste",
                AddressProvince = "TS",
                AddressStreet = "Via Carducci",
                AddressNumber = "12",
                PhoneNumber = "+39 345 1111113",
                IsMinor = true,
                CompetitionId = competitionId,
                RegistrationId = reg1Id,
                Competition = null!,
                Registration = null!
            };

            var reg1 = new Registration
            {
                Id = reg1Id,
                CreatedAt = new DateTime(2025, 12, 20, 10, 15, 0, DateTimeKind.Local),
                Email = "luca.bianchi@example.com",
                CompetitionId = competitionId,
                CompetitorId = adult1Id,
                Competitor = adult1,
                Minors = new List<Competitor> { minor11, minor12 },
                Competition = null!
            };
            // back-reference
            adult1.Registration = reg1;
            minor11.Registration = reg1;
            minor12.Registration = reg1;


            // ---------- REGISTRAZIONE 2 ----------
            var reg2Id = Guid.Parse("b2d0f1a2-7a25-41a8-9a1f-3a1a5e1c0b22");
            var adult2Id = Guid.Parse("2d5f9c93-3e1e-4d2d-8c3d-3f4f0a7b2b02");
            var m21Id = Guid.Parse("6b0b0c26-44bd-4f74-9d5b-7f3b2a6c3021");

            var adult2 = new Competitor
            {
                Id = adult2Id,
                FirstName = "Sara",
                LastName = "Conti",
                BirthDate = new DateTime(1988, 3, 2),
                Gender = Gender.FEMALE,
                BirthPlace = "Gorizia",
                BirthProvince = "GO",
                AddressCity = "Monfalcone",
                AddressProvince = "GO",
                AddressStreet = "Via Roma",
                AddressNumber = "5",
                PhoneNumber = "+39 346 2222222",
                IsMinor = false,
                CompetitionId = competitionId,
                RegistrationId = reg2Id,
                Competition = null!,
                Registration = null!
            };

            var minor21 = new Competitor
            {
                Id = m21Id,
                FirstName = "Matteo",
                LastName = "Conti",
                BirthDate = new DateTime(2012, 7, 18), // 13 anni a 01/2026
                Gender = Gender.MALE,
                BirthPlace = "Monfalcone",
                BirthProvince = "GO",
                AddressCity = "Monfalcone",
                AddressProvince = "GO",
                AddressStreet = "Via Roma",
                AddressNumber = "5",
                PhoneNumber = "+39 346 2222223",
                IsMinor = true,
                CompetitionId = competitionId,
                RegistrationId = reg2Id,
                Competition = null!,
                Registration = null!
            };

            var reg2 = new Registration
            {
                Id = reg2Id,
                CreatedAt = new DateTime(2025, 12, 22, 9, 40, 0, DateTimeKind.Local),
                Email = "sara.conti@example.com",
                CompetitionId = competitionId,
                CompetitorId = adult2Id,
                Competitor = adult2,
                Minors = new List<Competitor> { minor21 },
                Competition = null!
            };
            adult2.Registration = reg2;
            minor21.Registration = reg2;


            // ---------- REGISTRAZIONE 3 ----------
            var reg3Id = Guid.Parse("c3e1f2a3-8b36-42b9-8b2e-4b2b6f1c0c33");
            var adult3Id = Guid.Parse("3e60ad04-4f2f-4e3e-8d4e-40501b8c3c03");
            var m31Id = Guid.Parse("7c1c1d37-55ce-4075-ae6c-8f4c3b7d4031");
            var m32Id = Guid.Parse("8d2d2e48-66df-4b86-bf7d-9f5d4c8e5032");

            var adult3 = new Competitor
            {
                Id = adult3Id,
                FirstName = "Marco",
                LastName = "Rossi",
                BirthDate = new DateTime(1995, 11, 30),
                Gender = Gender.MALE,
                BirthPlace = "Udine",
                BirthProvince = "UD",
                AddressCity = "Udine",
                AddressProvince = "UD",
                AddressStreet = "Via Cavour",
                AddressNumber = "21",
                PhoneNumber = "+39 347 3333333",
                IsMinor = false,
                CompetitionId = competitionId,
                RegistrationId = reg3Id,
                Competition = null!,
                Registration = null!
            };

            var minor31 = new Competitor
            {
                Id = m31Id,
                FirstName = "Chiara",
                LastName = "Rossi",
                BirthDate = new DateTime(2009, 12, 1), // 16 anni a 01/2026
                Gender = Gender.FEMALE,
                BirthPlace = "Udine",
                BirthProvince = "UD",
                AddressCity = "Udine",
                AddressProvince = "UD",
                AddressStreet = "Via Cavour",
                AddressNumber = "21",
                PhoneNumber = "+39 347 3333334",
                IsMinor = true,
                CompetitionId = competitionId,
                RegistrationId = reg3Id,
                Competition = null!,
                Registration = null!
            };

            var minor32 = new Competitor
            {
                Id = m32Id,
                FirstName = "Tommaso",
                LastName = "Rossi",
                BirthDate = new DateTime(2011, 4, 9),  // 14 anni a 01/2026
                Gender = Gender.MALE,
                BirthPlace = "Udine",
                BirthProvince = "UD",
                AddressCity = "Udine",
                AddressProvince = "UD",
                AddressStreet = "Via Cavour",
                AddressNumber = "21",
                PhoneNumber = "+39 347 3333335",
                IsMinor = true,
                CompetitionId = competitionId,
                RegistrationId = reg3Id,
                Competition = null!,
                Registration = null!
            };

            var reg3 = new Registration
            {
                Id = reg3Id,
                CreatedAt = new DateTime(2026, 1, 2, 14, 5, 0, DateTimeKind.Local),
                Email = "marco.rossi@example.com",
                CompetitionId = competitionId,
                CompetitorId = adult3Id,
                Competitor = adult3,
                Minors = new List<Competitor> { minor31, minor32 },
                Competition = null!
            };
            adult3.Registration = reg3;
            minor31.Registration = reg3;
            minor32.Registration = reg3;


            // ---------- REGISTRAZIONE 4 ----------
            var reg4Id = Guid.Parse("d4f203a4-9c47-43ca-9c3f-5c3c7f1c0d44");
            var adult4Id = Guid.Parse("4f71be15-5030-404f-9e5f-51612c9d4d04");
            var m41Id = Guid.Parse("9e2e3f59-77f0-4cdb-bf8e-af6e5d9f6041");

            var adult4 = new Competitor
            {
                Id = adult4Id,
                FirstName = "Eleonora",
                LastName = "Pavan",
                BirthDate = new DateTime(1992, 8, 23),
                Gender = Gender.FEMALE,
                BirthPlace = "Pordenone",
                BirthProvince = "PN",
                AddressCity = "Pordenone",
                AddressProvince = "PN",
                AddressStreet = "Via Garibaldi",
                AddressNumber = "7",
                PhoneNumber = "+39 348 4444444",
                IsMinor = false,
                CompetitionId = competitionId,
                RegistrationId = reg4Id,
                Competition = null!,
                Registration = null!
            };

            var minor41 = new Competitor
            {
                Id = m41Id,
                FirstName = "Aurora",
                LastName = "Pavan",
                BirthDate = new DateTime(2010, 10, 28), // 15 anni a 01/2026
                Gender = Gender.FEMALE,
                BirthPlace = "Pordenone",
                BirthProvince = "PN",
                AddressCity = "Pordenone",
                AddressProvince = "PN",
                AddressStreet = "Via Garibaldi",
                AddressNumber = "7",
                PhoneNumber = "+39 348 4444445",
                IsMinor = true,
                CompetitionId = competitionId,
                RegistrationId = reg4Id,
                Competition = null!,
                Registration = null!
            };

            var reg4 = new Registration
            {
                Id = reg4Id,
                CreatedAt = new DateTime(2026, 1, 10, 11, 20, 0, DateTimeKind.Local),
                Email = "eleonora.pavan@example.com",
                CompetitionId = competitionId,
                CompetitorId = adult4Id,
                Competitor = adult4,
                Minors = new List<Competitor> { minor41 },
                Competition = null!
            };
            adult4.Registration = reg4;
            minor41.Registration = reg4;

            // GUID fissi per i gruppi (facile da usare anche in HasData)
            var group1Id = Guid.Parse("11111111-1111-1111-1111-111111111111"); // bianco
            var group2Id = Guid.Parse("22222222-2222-2222-2222-222222222222"); // blu
            var group3Id = Guid.Parse("33333333-3333-3333-3333-333333333333"); // verde
            var group4Id = Guid.Parse("44444444-4444-4444-4444-444444444444"); // rosso
            var group5Id = Guid.Parse("55555555-5555-5555-5555-555555555555"); // giallo
            var group6Id = Guid.Parse("66666666-6666-6666-6666-666666666666"); // nero

            var group1 = new ProblemsGroup
            {
                Id = group1Id,
                Order = 1,
                ColorCode = "#FFFFFF", // bianco
                CompetitionId = competitionId,
                Competition = null!,
                Problems = MakeProblems(group1Id, "Bianco", competitionId)
            };

            var group2 = new ProblemsGroup
            {
                Id = group2Id,
                Order = 2,
                ColorCode = "#0000FF", // blu
                CompetitionId = competitionId,
                Competition = null!,
                Problems = MakeProblems(group2Id, "Blu", competitionId)
            };

            var group3 = new ProblemsGroup
            {
                Id = group3Id,
                Order = 3,
                ColorCode = "#00FF00", // verde
                CompetitionId = competitionId,
                Competition = null!,
                Problems = MakeProblems(group3Id, "Verde", competitionId)
            };

            var group4 = new ProblemsGroup
            {
                Id = group4Id,
                Order = 4,
                ColorCode = "#FF0000", // rosso
                CompetitionId = competitionId,
                Competition = null!,
                Problems = MakeProblems(group4Id, "Rosso", competitionId)
            };

            var group5 = new ProblemsGroup
            {
                Id = group5Id,
                Order = 5,
                ColorCode = "#FFFF00", // giallo
                CompetitionId = competitionId,
                Competition = null!,
                Problems = MakeProblems(group5Id, "Giallo", competitionId)
            };

            var group6 = new ProblemsGroup
            {
                Id = group6Id,
                Order = 6,
                ColorCode = "#000000", // nero
                CompetitionId = competitionId,
                Competition = null!,
                Problems = MakeProblems(group6Id, "Nero", competitionId)
            };

          

            context.Competitions.AddRange([competition1, competition2, competition3, competition4]);
            context.Registrations.AddRange([reg1, reg2, reg3, reg4]);
            context.Competitors.AddRange([
                adult1, minor11, minor12,
                adult2, minor21,
                adult3, minor31, minor32,
                adult4, minor41]);

            // Collezioni pronte da persistere con EF Core
            var problemGroups = new List<ProblemsGroup> { group1, group2, group3, group4, group5, group6 };

            // Se ti serve anche l’elenco piatto di tutti i Problem per un AddRange dedicato:
            var allProblems = new List<Problem>();
            allProblems.AddRange(group1.Problems);
            allProblems.AddRange(group2.Problems);
            allProblems.AddRange(group3.Problems);
            allProblems.AddRange(group4.Problems);
            allProblems.AddRange(group5.Problems);
            allProblems.AddRange(group6.Problems);

            context.ProblemsGroups.AddRange(problemGroups);
            context.Problems.AddRange(allProblems);

            context.SaveChanges();
        }

        private static List<Problem> MakeProblems(Guid groupId, string colorPrefix, Guid competitionId)
        {
            var problems = new List<Problem>(capacity: 7);
            for (int i = 1; i <= 7; i++)
            {
                problems.Add(new Problem
                {
                    Id = Guid.NewGuid(),
                    Name = $"{colorPrefix}-{i}",
                    ProblemGroupId = groupId,
                    Group = null!,
                    CompetitionId = competitionId
                });
            }
            return problems;
        }
    }
}
