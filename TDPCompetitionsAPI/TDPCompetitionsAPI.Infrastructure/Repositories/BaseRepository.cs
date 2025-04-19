﻿using Microsoft.EntityFrameworkCore;
using TDPCompetitionsAPI.Core.Exceptions;
using TDPCompetitionsAPI.Core.Interfaces.Repositories;
using TDPCompetitionsAPI.Infrastructure.Data;
using TDPCompetitionsAPI.Infrastructure.Interfaces;

namespace TDPCompetitionsAPI.Infrastructure.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        private readonly AppDbContext _dbContext;

        public BaseRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<T> Create(T model)
        {
            await _dbContext.Set<T>().AddAsync(model);
            await _dbContext.SaveChangesAsync();
            return model;
        }

        public async Task Delete(T model)
        {
            _dbContext.Set<T>().Remove(model);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return await _dbContext.Set<T>().AsNoTracking().ToListAsync();
        }

        public async Task<T> GetById(string id)
        {
            var data = await _dbContext.Set<T>().FindAsync(id);
            if (data == null)
            {
                throw new EntityNotFoundException($"{typeof(T).Name} with id {id} not found");
            }

            return data;
        }

        public async Task SaveChange(T model)
        {
            await _dbContext.SaveChangesAsync();
        }

        public async Task Update(T model)
        {
            _dbContext.Set<T>().Update(model);
            await _dbContext.SaveChangesAsync();
        }
    }
}
