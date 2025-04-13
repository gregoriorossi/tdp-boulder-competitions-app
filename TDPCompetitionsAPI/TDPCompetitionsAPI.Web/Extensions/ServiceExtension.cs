using System.Runtime.CompilerServices;
using TDPCompetitionsAPI.Core.Interfaces;
using TDPCompetitionsAPI.Infrastructure.Repositories;

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

            #region Mapper
            #endregion

            return services;
        }
    }
}
