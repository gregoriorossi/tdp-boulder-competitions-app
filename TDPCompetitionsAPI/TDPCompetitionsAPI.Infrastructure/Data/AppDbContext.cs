using Microsoft.EntityFrameworkCore;
using TDPCompetitionsAPI.Infrastructure.Models;

namespace TDPCompetitionsAPI.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext() : base() { }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        internal DbSet<Competition> Competitions { get; set; }
        internal DbSet<Registration> Registrations { get; set; }
        internal DbSet<Minor> Minor { get; set; }
        internal DbSet<Competitor> Competitors { get; set; }
    }
}
