using TDPCompetitionsAPI.Core.Entities;

namespace TDPCompetitionsAPI.Core.Interfaces.Services
{
    public interface ICompetitionsService
    {
        public Task<List<Competition>> GetAll();
        public Task<Competition> Create(Competition competition);
        public Task<bool> Exists(Competition competition);
    }
}
