using TDPCompetitionsAPI.Core.Interfaces.Repositories;
using TDPCompetitionsAPI.Core.Interfaces.Services;
using TDPCompetitionsAPI.Infrastructure.Repositories;
using TDPCompetitionsAPI.Infrastructure.Interfaces;
using TDPCompetitionsAPI.Services;

namespace TDPCompetitionsAPI.Extensions
{
    public static class ServiceExtension
    {
        public static IServiceCollection RegisterService(this IServiceCollection services)
        {
            #region Services
            #endregion

            #region Repositories
            services.AddScoped<ICompetitionsRepository, CompetitionsRepository>();
            #endregion

            #region Repositories
            services.AddScoped<ICompetitionsService, CompetitionsService>();
            #endregion



            return services;
        }
    }
}
