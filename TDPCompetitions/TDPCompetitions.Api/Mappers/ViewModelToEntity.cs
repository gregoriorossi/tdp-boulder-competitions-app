using TDPCompetitions.Api.Helpers;
using TDPCompetitions.Api.ViewModels.Competitors;
using TDPCompetitions.Api.ViewModels.Editors;
using TDPCompetitions.Core.Entities;

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

        internal static SentProblem SendProblemVMToSentProblem(SendProblemVM model)
        {
            return new SentProblem
            {
                ProblemId = model.ProblemId,
                CompetitorId = model.CompetitorId,
                CompetitionId   = model.CompetitionId,
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

        private static Guid? ParseGuid(string? guid)
        {
            return !string.IsNullOrEmpty(guid) ? Guid.Parse(guid) : null;
        }
    }
}
