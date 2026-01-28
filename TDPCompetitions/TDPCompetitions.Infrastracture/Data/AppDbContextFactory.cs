using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore.Design;

namespace TDPCompetitions.Infrastracture.Data
{
    public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            var basePath = Path.Combine(Directory.GetCurrentDirectory(), "..\\TDPRegistrationsAPI.Web"); // oppure aggiusta con ../ se serve
            var configuration = new ConfigurationBuilder()
                 .SetBasePath(basePath)
                 .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                 .Build();

            var connectionString = configuration.GetConnectionString("DefaultConnection");
            Console.WriteLine("Connecting to Database");
            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();   
            optionsBuilder.UseSqlServer(connectionString);

            return new AppDbContext(optionsBuilder.Options);
        }
    }
}
