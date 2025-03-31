using Microsoft.EntityFrameworkCore;
using TDPCompetitionsAPI.Domain.Entities;

namespace TDPCompetitionsAPI.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}
