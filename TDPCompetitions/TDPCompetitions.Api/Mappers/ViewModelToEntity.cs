using TDPCompetitions.Api.Extensions;
using TDPCompetitions.Api.Helpers;
using TDPCompetitions.Api.ViewModels.Competitors;
using TDPCompetitions.Api.ViewModels.Editors;
using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Enums;

namespace TDPCompetitions.Api.Mappers
{
    public class ViewModelToEntity
    {
        public static Competition AddCompetitionVMToCompetition(AddCompetitionVM model)
        {
            string slug = SlugHelper.Generate(model.Title);
            return new Competition
            {
                Title = model.Title,
                Slug = slug
            };
        }

        internal static ProblemsGroup AddProblemGroupToProblemGroup(AddProblemsGroupVM model)
        {
            return new ProblemsGroup
            {
                ColorCode = model.ColorCode,
                CompetitionId = model.CompetitionId,
                Order = model.Order
            };
        }

        internal static ICollection<Problem> AddProblemsToGroupVMToProblems(AddProblemsToGroupVM model, Guid competitionId)
        {
            return model.Problems.Select(p => new Problem
            {
                CompetitionId = competitionId,
                ProblemGroupId = model.GroupId,
                Name = p.Name
            }).ToList();
        }

        internal static Registration AddRegistrationVMToRegistration(AddRegistrationVM model, Guid competitionId)
        {
            Competitor competitor = AddRegistrationVMToCompetitor(model);
            ICollection <Competitor> minors = model.Minors.Select(AddMinorVMToCompetitor).ToList();

            return new Registration
            {
                CompetitionId = competitionId,
                CreatedAt = DateTime.UtcNow,
                Email = model.Email,
                Competitor = competitor,
                Minors = minors
            };
        }

        private static Competitor AddRegistrationVMToCompetitor(AddRegistrationVM model)
        {
            return new Competitor
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                IsMinor = false,
                Gender = model.Gender.IntToGender(),
                BirthProvince = model.BirthProvince,
                AddressCity = model.AddressCity,
                AddressNumber = model.AddressNumber,
                AddressProvince = model.AddressProvince,
                AddressStreet = model.AddressStreet,
                BirthDate = model.BirthDate,
                BirthPlace = model.BirthPlace,
                PhoneNumber = model.PhoneNumber
            };
        }

        private static Competitor AddMinorVMToCompetitor(MinorVM model)
        {
            return new Competitor
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                IsMinor = false,
                Gender = model.Gender.IntToGender(),
                BirthProvince = model.BirthProvince,
                AddressCity = model.AddressCity,
                AddressNumber = model.AddressNumber,
                AddressProvince = model.AddressProvince,
                AddressStreet = model.AddressStreet,
                BirthDate = model.BirthDate,
                BirthPlace = model.BirthPlace
            };
        }

        internal static SentProblem SendProblemVMToSentProblem(SendProblemVM model)
        {
            return new SentProblem
            {
                ProblemId = model.ProblemId,
                CompetitorId = model.CompetitorId,
                CompetitionId = model.CompetitionId,
                SentAt = DateTime.Now
            };
        }

        internal static SentSpecialProblem SendSpecialProblemVMToSentSpecialProblem(SendSpecialProblemVM model)
        {
            return new SentSpecialProblem
            {
                SpecialProblemId = model.SpecialProblemId,
                CompetitorId = model.CompetitorId,
                CompetitionId = model.CompetitionId,
                SentAt = DateTime.Now
            };
        }

        internal static async Task<Competition> UpdateCompetitionVMToCompetitionAsync(UpdateCompetitionVM model)
        {
            string slug = SlugHelper.Generate(model.Title);
            Core.Entities.File? bannerImage = await BuildFile(model.BannerImage);
            Core.Entities.File? privacyAttachment = await BuildFile(model.PrivacyAttachment);

            return new Competition
            {
                Id = model.Id,
                Title = model.Title,
                Description = model.Description,
                Slug = slug,
                BannerImageId = model.BannerImageId,
                BannerImage = bannerImage,
                Date = model.Date,
                EmailText = model.EmailText,
                PrivacyAttachmentId = model.PrivacyAttachmentId,
                PrivacyAttachment = privacyAttachment,
                RegistrationsOpen = model.RegistrationsOpen
            };
        }

        internal static ProblemsGroup UpdateProblemGroupVMToProblemGroup(UpdateProblemsGroupVM model)
        {
            return new ProblemsGroup
            {
                Id = model.Id,
                ColorCode = model.ColorCode,
                Order = model.Order,
            };
        }

        internal static Problem UpdateProblemVMToProblem(UpdateProblemVM model)
        {
            return new Problem
            {
                Id = model.Id,
                CompetitionId = model.CompetitionId,
                Name = model.Name,
                ProblemGroupId = model.ProblemGroupId
            };
        }

        private async static Task<Core.Entities.File?> BuildFile(IFormFile? formFile)
        {
            Core.Entities.File? file = null;
            if (formFile != null)
            {
                file = new Core.Entities.File();
                file.Length = formFile.Length;
                file.ContentType = formFile.ContentType;
                file.FileName = formFile.FileName;

                await using var ms = new MemoryStream();
                await formFile.CopyToAsync(ms);
                file.Data = ms.ToArray();
            }
            return file;
        }

        public static Competitor UpdateCompetitorVMToCompetitor(Guid competitiorId, UpdateCompetitorVM model)
        {
            var competitor = new Competitor
            {
                Id = competitiorId,
                AddressCity = model.AddressCity,
                AddressNumber = model.AddressNumber,
                AddressStreet = model.AddressStreet,
                AddressProvince = model.AddressProvince,
                BirthPlace = model.BirthPlace,
                BirthDate = model.BirthDate,
                BirthProvince = model.BirthProvince,
                Gender = model.Gender.IntToGender(),
                FirstName = model.FirstName,
                LastName = model.LastName,
                PhoneNumber = model.PhoneNumber
            };

            return competitor;
        }

        private static Guid? ParseGuid(string? guid)
        {
            return !string.IsNullOrEmpty(guid) ? Guid.Parse(guid) : null;
        }
    }
}
