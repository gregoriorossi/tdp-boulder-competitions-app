using TDPCompetitionsAPI.Core.Entities;

namespace TDPCompetitionsAPI.Core.Interfaces.Repositories
{
    public interface ICompetitionsRepository
    {
        Task<IEnumerable<Competition>> GetAll();
        Task<Competition> GetById(Guid id);
        Task<Competition> Create(Competition model);
        Task Update(Competition model);
        Task Delete(Competition model);
        Task SaveChange(Competition model);
    }
}
