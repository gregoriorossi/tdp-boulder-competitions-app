using Microsoft.EntityFrameworkCore;
using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Infrastracture.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext() : base() { }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Competition> Competitions { get; set; }

        public DbSet<Registration> Registrations { get; set; }

        public DbSet<Athlete> Athletes { get; set; }

        public DbSet<ProblemsGroup> ProblemGroups { get; set; }

        public DbSet<Problem> Problems { get; set; }

        public DbSet<SpecialProblem> SpecialProblems { get; set; }

        public DbSet<SentProblem> SentProblems { get; set; }

        public DbSet<SentSpecialProblem> SentSpecialProblems { get; set; }

        public DbSet<Core.Entities.File> Files { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Competition>(entity =>
            {
                entity.HasKey(c => c.Id);

                entity.Property(c => c.Title)
                    .IsRequired();

                entity.HasMany(c => c.Registrations)
                .WithOne(r => r.Competition)
                .HasForeignKey(r => r.CompetitionId)
                .OnDelete(DeleteBehavior.Cascade);

                entity.HasMany(c => c.ProblemGroups)
                    .WithOne(g => g.Competition)
                    .HasForeignKey(g => g.CompetitionId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Registration>(entity =>
            {
                entity.HasKey(r => r.Id);
                entity.Property(r => r.CreatedAt).IsRequired();
                entity.Property(r => r.Email).IsRequired();
                entity.Property(r => r.CompetitionId).IsRequired();
            });

            modelBuilder.Entity<ProblemsGroup>(entity =>
            {
                entity.HasKey(g => g.Id);
                entity.Property(g => g.ColorCode).IsRequired();
                entity.Property(g => g.CompetitionId).IsRequired();
                entity.HasMany(g => g.Problems)
                    .WithOne(p => p.Group)
                    .HasForeignKey(p => p.ProblemGroupId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Problem>(entity =>
            {
                entity.HasKey(p => p.Id);
                entity.Property(p => p.Name).IsRequired();
                entity.Property(p => p.CompetitionId).IsRequired();
            });

            modelBuilder.Entity<SpecialProblem>(entity =>
            {
                entity.HasKey(g => g.Id);
                entity.Property(g => g.Name).IsRequired();
                entity.Property(g => g.CompetitionId).IsRequired();
            });

            modelBuilder.Entity<Athlete>(entity =>
            {
                // todo
            });

            modelBuilder.Entity<SentProblem>(entity =>
            {
                entity.HasKey(p => p.Id);
                entity.Property(p => p.ProblemId).IsRequired();
                entity.Property(p => p.AthleteId).IsRequired();
                entity.Property(p => p.CompetitionId).IsRequired();
                entity.Property(p => p.SentAt).IsRequired();
            });

            modelBuilder.Entity<SentSpecialProblem>(entity =>
            {
                entity.HasKey(p => p.Id);
                entity.Property(p => p.SpecialProblemId).IsRequired();
                entity.Property(p => p.AthleteId).IsRequired();
                entity.Property(p => p.CompetitionId).IsRequired();
                entity.Property(p => p.SentAt).IsRequired();
            });

            modelBuilder.Entity<Core.Entities.File>(entity =>
            {
                entity.HasKey(f => f.Id);
            });
        }
    }
}
