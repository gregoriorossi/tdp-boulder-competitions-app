namespace TDPCompetitionsAPI.Infrastructure.Interfaces
{
    public interface IBaseRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAll();
        Task<T> GetById(string id);
        Task<T> Create(T model);
        Task Update(T model);
        Task Delete(T model);
        Task SaveChange(T model);
    }
}
