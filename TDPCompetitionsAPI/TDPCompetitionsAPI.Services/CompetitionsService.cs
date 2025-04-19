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

        public async Task<Competition> Create(Competition competition)
        {
            var result = await competitionsRepository.Create(competition);
            return result;
        }

        public async Task<List<Competition>> GetAll()
        {
            var competitions = await this.competitionsRepository.GetAll();
            return competitions
                .OrderByDescending(c => c.Date)
                .ToList();
        }

        public async Task<bool> Exists(Competition competition)
        {
            var competitions = await competitionsRepository.GetAll();
            var result = competitions.Any(c => c.Slug == competition.Slug);
            return result;
        }
    }
}
