using Microsoft.EntityFrameworkCore;
using TDPCompetitionsAPI.Core.Exceptions;
using TDPCompetitionsAPI.Core.Interfaces.Repositories;
using TDPCompetitionsAPI.Infrastructure.Data;
using TDPCompetitionsAPI.Infrastructure.Models;
using TDPCompetitionsAPI.Web.Mappers;

namespace TDPCompetitionsAPI.Infrastructure.Repositories
{
    public class CompetitionsRepository : ICompetitionsRepository
    {
        private readonly AppDbContext _dbContext;

        public CompetitionsRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Core.Entities.Competition> Create(Core.Entities.Competition model)
        {
            var data = EntityToModel.CreateEntityFromModel(model);
            var result = await _dbContext.Set<Competition>().AddAsync(data);
            await _dbContext.SaveChangesAsync();
            return ModelToEntity.CreateModelFromEntity(result.Entity);
        }

        public async Task Delete(Core.Entities.Competition model)
        {
            var data = EntityToModel.CreateEntityFromModel(model);
            _dbContext.Set<Competition>().Remove(data);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Core.Entities.Competition>> GetAll()
        {
            var result = await _dbContext.Set<Competition>()
                .AsNoTracking()
                .ToListAsync();
            return result.Select(ModelToEntity.CreateModelFromEntity);
        }

        public async Task<Core.Entities.Competition> GetById(Guid id)
        {
            var data = await _dbContext.Set<Competition>().AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);
            if (data == null)
            {
                throw new EntityNotFoundException($"{typeof(Core.Entities.Competition).Name} with id {id} not found");
            }

            return ModelToEntity.CreateModelFromEntity(data);
        }

        public async Task SaveChange(Core.Entities.Competition model)
        {
            await _dbContext.SaveChangesAsync();
        }

        public async Task Update(Core.Entities.Competition model)
        {
            var data = EntityToModel.CreateEntityFromModel(model);
            _dbContext.Set<Competition>().Update(data);
            await _dbContext.SaveChangesAsync();
        }
    }
}
