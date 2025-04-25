using TDPCompetitionsAPI.Core.Entities;
using TDPCompetitionsAPI.Core.Interfaces.Repositories;
using TDPCompetitionsAPI.Core.Interfaces.Services;

namespace TDPCompetitionsAPI.Services
{
    public class CompetitionsService : ICompetitionsService
    {
        private readonly ICompetitionsRepository competitionsRepository;

        public CompetitionsService(ICompetitionsRepository competitionsRepository)
        {
            this.competitionsRepository = competitionsRepository;
        }

        public async Task<List<Competition>> GetAll()
        {
            var competitions = await competitionsRepository.GetAll();
            return competitions
                .OrderByDescending(c => c.Date)
                .ToList();
        }

        public async Task<Competition> Get(Guid id)
        {
            var competition = await competitionsRepository.GetById(id);
            return competition;
        }

        public async Task<Competition> Create(Competition competition)
        {
            var result = await competitionsRepository.Create(competition);
            return result;
        }

        public async Task<bool> Exists(Guid id)
        {
            try
            {
                var competition = await competitionsRepository.GetById(id);
                return competition != null;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> IsSlugAvailable(Competition competition)
        {
            var competitions = await competitionsRepository.GetAll();
            var slugExists = competitions.Any(c => c.Slug == competition.Slug && c.Id != competition.Id);
            return !slugExists;
        }

        public async Task Delete(Competition competition)
        {
            await competitionsRepository.Delete(competition);
        }

        public async Task<Competition> Update(Competition competition)
        {
            await competitionsRepository.Update(competition);
            return competition;
        }
    }
}
