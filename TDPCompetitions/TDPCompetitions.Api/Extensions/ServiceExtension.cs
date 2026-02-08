using TDPCompetitions.Core.Interfaces.Managers;
using TDPCompetitions.Core.Interfaces.Repositories;
using TDPCompetitions.Infrastracture.Managers;
using TDPCompetitions.Infrastracture.Repositories;

namespace TDPCompetitions.Api.Extensions
{
    public static class ServiceExtension
    {
        public static IServiceCollection RegisterService(this IServiceCollection services)
        {
            #region Managers
            services.AddScoped<ICompetitionsManager, CompetitionsManager>();
            services.AddScoped<IProblemsManager, ProblemsManager>();
            services.AddScoped<IFilesManager, FilesManager>();
            #endregion

            #region Repositories
            services.AddScoped<ICompetitionsRepository, CompetitionsRepository>();
            services.AddScoped<IProblemsRepository, ProblemsRepository>();
            services.AddScoped<IFilesRepository, FilesRepository>();
            #endregion

            #region Services

            #endregion

            return services;
        }
    }
}
