using Microsoft.EntityFrameworkCore;
using TDPCompetitionsAPI.Infrastructure.Models;

namespace TDPCompetitionsAPI.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext() : base() { }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Competition> Competitions { get; set; }
        public DbSet<Registration> Registrations { get; set; }
        public DbSet<Minor> Minor { get; set; }
        public DbSet<Competitor> Competitors { get; set; }
    }
}
