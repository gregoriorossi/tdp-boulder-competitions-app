using System.Linq.Expressions;
using TDPCompetitions.Core.Entities;
using TDPCompetitions.Core.Enums;
using TDPCompetitions.Core.Exceptions;
using TDPCompetitions.Core.Interfaces.Managers;
using TDPCompetitions.Core.Interfaces.Repositories;
using TDPCompetitions.Core.Models;

namespace TDPCompetitions.Infrastracture.Managers
{
    public class CompetitionsManager : ICompetitionsManager
    {
        private readonly ICompetitionsRepository _competitionsRepository;

        public CompetitionsManager(ICompetitionsRepository competitionsRepository)
        {
            _competitionsRepository = competitionsRepository;
        }

        public async Task<bool> CompetitionExists(Guid id, CancellationToken cancellationToken)
        {
            Expression<Func<Competition, bool>> whereFn = (c) => c.Id == id;
            ICollection<Competition> competitions = await _competitionsRepository.GetAllAsync(whereFn, cancellationToken);
            return competitions.Count > 0;
        }

        public async Task<Competition> AddAsync(Competition competition, CancellationToken cancellationToken)
        {
            Competition result = await _competitionsRepository.AddAsync(competition, cancellationToken);
            return result;
        }

        public async Task DeleteAsync(Competition competition, CancellationToken cancellationToken)
        {
            await _competitionsRepository.DeleteAsync(competition, cancellationToken);
        }

        public async Task<Competition?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            Expression<Func<Competition, bool>> whereFn = (c) => c.Id == id;
            ICollection<Competition> competitions = await _competitionsRepository.GetAllAsync(whereFn, cancellationToken);
            return competitions.FirstOrDefault();
        }

        public async Task<Competition?> GetBySlugAsync(string slug, CancellationToken cancellationToken)
        {
            Expression<Func<Competition, bool>> whereFn = (c) => c.Slug.ToLower() == slug.ToLower();
            ICollection<Competition> competitions = await _competitionsRepository.GetAllAsync(whereFn, cancellationToken);
            return competitions.FirstOrDefault();
        }

        public async Task<bool> IsSlugAvailableAsync(Competition competition, CancellationToken cancellationToken)
        {
            Competition? result = await GetBySlugAsync(competition.Slug, cancellationToken);

            bool sameCompetition = result?.Slug == competition.Slug;
            bool slugExists = result != null;
            return !slugExists || sameCompetition;
        }

        public async Task<Competition> UpdateAsync(Competition updateCompetition, CancellationToken cancellationToken)
        {
            Competition? competition = await GetByIdAsync(updateCompetition.Id, cancellationToken);
            if (competition == null)
            {
                throw new CompetitionNotFoundException(updateCompetition.Id);
            }

            competition.Title = updateCompetition.Title;
            competition.Description = updateCompetition.Description;
            competition.Slug = updateCompetition.Slug;
            competition.RegistrationsOpen = updateCompetition.RegistrationsOpen;
            competition.Date = updateCompetition.Date;
            competition.EmailText = updateCompetition.EmailText;
            competition.BannerImage = updateCompetition.BannerImage;
            competition.BannerImageId = updateCompetition.BannerImageId;
            competition.PrivacyAttachmentId = updateCompetition.PrivacyAttachmentId;
            competition.PrivacyAttachment = updateCompetition.PrivacyAttachment;
            Competition result = await _competitionsRepository.UpdateCompetitionAsync(competition, cancellationToken);
            return result;
        }

        public async Task<Competition> UpdateCompetitionStatusAsync(Guid competitionId, CompetitionStatus status, CancellationToken cancellationToken)
        {
            Competition? competition = await GetByIdAsync(competitionId, cancellationToken);
            if (competition == null)
            {
                throw new CompetitionNotFoundException(competitionId);
            }

            competition.Status = status;
            Competition result = await _competitionsRepository.UpdateCompetitionAsync(competition, cancellationToken);
            return result;
        }

        public async Task<bool> IsCompetitorRegisteredAsync(Guid competitorId, Guid competitionId, CancellationToken cancellationToken)
        {
            Expression<Func<Competitor, bool>> whereFn = c => c.Id == competitorId && c.CompetitionId == competitionId;
            ICollection<Competitor> result = await _competitionsRepository.GetAllCompetitorsAsync(whereFn, cancellationToken);
            return result.Count > 0;
        }

        public async Task<bool> IsCompetitorRegisteredAsync(string competitorEmail, Guid competitionId, CancellationToken cancellationToken)
        {
            Expression<Func<Registration, bool>> whereFn = c => c.Email.ToLower() == competitorEmail.ToLower();
            ICollection<Registration> result = await _competitionsRepository.GetAllRegistrationsAsync(whereFn, cancellationToken);
            return result.Count > 0;
        }

        public async Task<Registration> AddRegistrationAsync(Registration registration, CancellationToken cancellationToken)
        {
            Registration result = await _competitionsRepository.AddRegistration(registration, cancellationToken); 
            return result;
        }

        public async Task<Registration?> GetRegistrationAsync(Guid registrationId, CancellationToken cancellationToken)
        {
            Expression<Func<Registration, bool>> whereFn = r => r.Id == registrationId;
            ICollection<Registration> result = await _competitionsRepository.GetAllRegistrationsAsync(whereFn, cancellationToken);
            return result.FirstOrDefault();
        }

        public Task DeleteRegistrationAsync(Registration registration, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task<Competitor?> GetCompetitorAsync(Guid competitorId, CancellationToken cancellationToken)
        {
            Expression<Func<Competitor, bool>> whereFn = c => c.Id == competitorId;
            Competitor? competitor = (await _competitionsRepository.GetAllCompetitorsAsync(whereFn, cancellationToken)).FirstOrDefault();
            return competitor;
        }

        public async Task<Competitor> UpdateCompetitorAsync(Competitor updatedCompetitor, CancellationToken cancellationToken)
        {
            Competitor? competitor = await GetCompetitorAsync(updatedCompetitor.Id, cancellationToken);
            if (competitor == null)
            {
                throw new CompetitorNotFoundException(updatedCompetitor.Id);
            }

            competitor.AddressCity = updatedCompetitor.AddressCity;
            competitor.AddressNumber = updatedCompetitor.AddressNumber;
            competitor.AddressStreet = updatedCompetitor.AddressStreet;
            competitor.AddressProvince = updatedCompetitor.AddressProvince;
            competitor.BirthPlace = updatedCompetitor.BirthPlace;
            competitor.BirthDate = updatedCompetitor.BirthDate;
            competitor.BirthProvince = updatedCompetitor.BirthProvince;
            competitor.Gender = updatedCompetitor.Gender;
            competitor.FirstName = updatedCompetitor.FirstName;
            competitor.LastName = updatedCompetitor.LastName;
            competitor.PhoneNumber = updatedCompetitor.PhoneNumber;

            Competitor result = await _competitionsRepository.UpdateCompetitorAsync(competitor, cancellationToken);
            return result;
        }

        public Task<ICollection<RankingCompetitor>> GetRankingAsync(Guid competitionId, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<Competitor>> GetCompetitorsAsync(Guid competitionId, CancellationToken cancellationToken)
        {
            Expression<Func<Competitor, bool>> whereFn = c => c.CompetitionId == competitionId;
            ICollection<Competitor> competitors = await _competitionsRepository.GetAllCompetitorsAsync(whereFn, cancellationToken);

            return competitors
                .OrderBy(c => c.LastName)
                .ThenBy(c => c.FirstName)
                .ToList();
        }
    }
}
