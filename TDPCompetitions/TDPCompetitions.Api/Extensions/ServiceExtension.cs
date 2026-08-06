using TDPCompetitions.Core.Interfaces.Managers;
using TDPCompetitions.Core.Interfaces.Repositories;
using TDPCompetitions.Core.Interfaces.Services;
using TDPCompetitions.Core.Models;
using TDPCompetitions.Infrastracture.Managers;
using TDPCompetitions.Infrastracture.Repositories;
using TDPCompetitions.Infrastracture.Services;

namespace TDPCompetitions.Api.Extensions
{
    public static class ServiceExtension
    {
        public static IServiceCollection RegisterService(this IServiceCollection services, IConfiguration configuration)
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
            services.AddScoped<IUsersRepository, UsersRepository>();
            #endregion

            #region Services
            services.AddScoped<IExportService, ExportService>();

            services.AddScoped<IEmailTemplateService, EmailTemplateService>();
            services.AddScoped<IEmailService, EmailService>();
            #endregion

            #region Settings
            services.Configure<EmailSettings>(configuration.GetSection(Constants.Config.EmailServiceSettings.SectionName));
            #endregion

            return services;
        }
    }
}
