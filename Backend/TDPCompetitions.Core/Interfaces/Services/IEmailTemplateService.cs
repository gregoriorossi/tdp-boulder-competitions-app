namespace TDPCompetitions.Core.Interfaces.Services;

public interface IEmailTemplateService
{
    /// <summary>
    /// Renders an email template with the provided model
    /// </summary>
    Task<string> RenderTemplateAsync<T>(string templateName, T model, CancellationToken cancellationToken = default) where T : class;
}
