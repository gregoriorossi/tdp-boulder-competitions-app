using TDPCompetitions.Api.Extensions;
using TDPCompetitions.Api.Helpers;
using TDPCompetitions.Api.ViewModels.Competitors;
using TDPCompetitions.Api.ViewModels.Competitors.Requests.AddRegistration;
using TDPCompetitions.Api.ViewModels.Editors.Requests;
using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Api.Mappers
{
    public class ViewModelToEntity
    {
        public static Competition AddCompetitionVMToCompetition(AddCompetitionRequest model)
        {
            string slug = SlugHelper.Generate(model.Title);
            return new Competition
            {
                Title = model.Title,
                Date = model.Date,
                Slug = slug
            };
        }

        internal static ProblemsGroup AddProblemGroupToProblemGroup(AddProblemsGroupRequest model)
        {
            return new ProblemsGroup
            {
                ColorCode = model.ColorCode,
                CompetitionId = model.CompetitionId,
                Order = model.Order
            };
        }

        internal static Problem AddProblemToGroupVMToProblem(AddProblemToGroupRequest model)
        {
            return new Problem
            {
                CompetitionId = model.CompetitionId,
                ProblemGroupId = model.ProblemsGroupId,
                Name = model.Name
            };
        }

        internal static Registration AddRegistrationRequestToRegistration(AddRegistrationRequest model, Guid competitionId)
        {
            Competitor competitor = AddRegistrationVMToCompetitor(model, model.Minors.Any());
            ICollection <Competitor> minors = model.Minors.Select(AddMinorVMToCompetitor).ToList();

            return new Registration
            {
                CompetitionId = competitionId,
                CreatedAt = DateTime.UtcNow,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber,
                Competitor = competitor,
                Minors = minors
            };
        }

        internal static Competitor AddMinorRequestToCompetitor(AddMinorRequest model, Registration registration, Guid competitionId)
        {
            return new Competitor
            {
                CompetitionId = competitionId,
                RegistrationId = registration.Id,
                FirstName = model.FirstName,
                LastName = model.LastName,
                IsMinor = true,
                Gender = model.Gender.IntToGender(),
                BirthProvince = model.BirthProvince,
                AddressCity = model.AddressCity,
                AddressNumber = model.AddressNumber,
                AddressProvince = model.AddressProvince,
                AddressStreet = model.AddressStreet,
                BirthDate = model.BirthDate,
                BirthPlace = model.BirthPlace,
            };
        }

        internal static Registration AddRegistrationRequestToRegistration(ViewModels.Editors.Requests.AddRegistration.AddRegistrationRequest model, Guid competitionId)
        {
            Competitor competitor = AddRegistrationVMToCompetitor(model);
            ICollection<Competitor> minors = model.Minors.Select(m => AddMinorRequestToCompetitor(m, competitionId)).ToList();

            return new Registration
            {
                CompetitionId = competitionId,
                CreatedAt = DateTime.UtcNow,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber,
                Competitor = competitor,
                Minors = minors
            };
        }

        internal static Competitor AddMinorRequestToCompetitor(ViewModels.Editors.Requests.AddRegistration.AddMinorRequest model, Guid competitionId)
        {
            return new Competitor
            {
                CompetitionId = competitionId,
                FirstName = model.FirstName,
                LastName = model.LastName,
                IsMinor = true,
                Gender = model.Gender.IntToGender(),
                BirthProvince = model.BirthProvince,
                AddressCity = model.AddressCity,
                AddressNumber = model.AddressNumber,
                AddressProvince = model.AddressProvince,
                AddressStreet = model.AddressStreet,
                BirthDate = model.BirthDate,
                BirthPlace = model.BirthPlace,
                GuardianOnly = true
            };
        }

        internal static Competitor UpdateMinorRequestToCompetitor(UpdateMinorRequest model, Guid competitionId, Registration registration)
        {
            return new Competitor
            {
                Id = model.Id,
                CompetitionId = competitionId,
                RegistrationId = registration.Id,
                FirstName = model.FirstName,
                LastName = model.LastName,
                IsMinor = true,
                Gender = model.Gender.IntToGender(),
                BirthProvince = model.BirthProvince,
                AddressCity = model.AddressCity,
                AddressNumber = model.AddressNumber,
                AddressProvince = model.AddressProvince,
                AddressStreet = model.AddressStreet,
                BirthDate = model.BirthDate,
                BirthPlace = model.BirthPlace,
                GuardianOnly = true
            };
        }

        internal static Registration UpdateRegistrationRequestToRegistration(UpdateRegistrationRequest model, Guid competitionId)
        {
            Competitor competitor = UpdateRegistrationVMToCompetitor(model);

            return new Registration
            {
                Id = model.Id,
                CompetitionId = competitionId,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber,
                Competitor = competitor,
                Minors = []
            };
        }

        private static Competitor AddRegistrationVMToCompetitor(AddRegistrationRequest model, bool hasMinors)
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
                GuardianOnly = hasMinors ? model.GuardianOnly : false
            };
        }

        private static Competitor AddRegistrationVMToCompetitor(ViewModels.Editors.Requests.AddRegistration.AddRegistrationRequest model)
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
                GuardianOnly = model.GuardianOnly
            };
        }

        private static Competitor UpdateRegistrationVMToCompetitor(UpdateRegistrationRequest model)
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
                GuardianOnly = model.GuardianOnly
            };
        }

        private static Competitor AddMinorVMToCompetitor(Minor model)
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
                GuardianOnly = false
            };
        }

        internal static SentProblem SendProblemRequestToSentProblem(Guid competitionId, Guid problemId, SendProblemRequest model)
        {
            return new SentProblem
            {
                ProblemId = problemId,
                CompetitorId = model.CompetitorId,
                CompetitionId = competitionId,
                SentAt = DateTime.Now
            };
        }

        internal static SentSpecialProblem SendSpecialProblemRequestToSentProblem(Guid competitionId, Guid specialProblemId, SendSpecialProblemRequest model)
        {
            return new SentSpecialProblem
            {
                SpecialProblemId = specialProblemId,
                CompetitorId = model.CompetitorId,
                CompetitionId = competitionId,
                SentAt = model.SentAt
            };
        }

        internal static SpecialProblem AddSpecialProblemVMToSpecialProblem(AddSpecialProblemRequest model)
        {
            return new SpecialProblem
            {
                Name = model.Name,
                CompetitionId = model.CompetitionId
            };
        }


        internal static SpecialProblem UpdateSpecialProblemVMToSpecialProblem(UpdateSpecialProblemRequest model)
        {
            return new SpecialProblem
            {
                Id = model.Id,
                Name = model.Name,
                CompetitionId = model.CompetitionId
            };
        }

        internal static async Task<Competition> UpdateCompetitionRequesetToCompetitionAsync(UpdateCompetitionRequest model)
        {
            string slug = SlugHelper.Generate(model.Title);
            Core.Entities.File? privacyAttachment = await BuildFile(model.PrivacyAttachment);

            return new Competition
            {
                Id = model.Id,
                Title = model.Title,
                Description = model.Description,
                PrivacyText = model.PrivacyText,
                Slug = slug,
                Date = model.Date,
                EmailSubject = model.EmailSubject,
                EmailText = model.EmailText,
                PrivacyAttachmentId = model.PrivacyAttachmentId,
                PrivacyAttachment = privacyAttachment,
                RegistrationsOpen = model.RegistrationsOpen,
                RankingsVisible = model.RankingsVisible
            };
        }

        internal static ICollection<ProblemsGroup> UpdateProblemGroupsVMToProblemGroups(UpdateProblemsGroupsRequest model)
        {
            return model.Groups.Select(group =>  new ProblemsGroup
            {
                Id = group.Id,
                ColorCode = group.ColorCode,
                Order = group.Order,
                CompetitionId = group.CompetitionId
            }).ToList();
        }

        internal static Problem UpdateProblemVMToProblem(UpdateProblemRequest model)
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
                LastName = model.LastName
            };

            return competitor;
        }

        private static Guid? ParseGuid(string? guid)
        {
            return !string.IsNullOrEmpty(guid) ? Guid.Parse(guid) : null;
        }
    }
}
