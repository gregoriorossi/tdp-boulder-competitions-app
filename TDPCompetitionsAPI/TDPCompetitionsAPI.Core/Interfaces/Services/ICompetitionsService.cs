using TDPCompetitionsAPI.Core.Entities;

namespace TDPCompetitionsAPI.Core.Interfaces.Services
{
    public interface ICompetitionsService
    {
        public Task<List<Competition>> GetAll();
        public Task<Competition> Get(Guid id);
        public Task<bool> Exists(Guid id);
        public Task<bool> IsSlugAvailable(Competition competition);
        public Task<Competition> Create(Competition competition);
        public Task<Competition> Update(Competition competition);
        public Task Delete(Competition competition);
    }
}
