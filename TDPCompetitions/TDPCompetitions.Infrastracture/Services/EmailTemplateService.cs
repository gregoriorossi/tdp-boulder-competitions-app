using Microsoft.Extensions.Logging;
using System.Text;
using TDPCompetitions.Core.Interfaces.Services;

namespace TDPCompetitions.Infrastracture.Services;

public class EmailTemplateService : IEmailTemplateService
{
    private readonly ILogger<EmailTemplateService> _logger;
    private readonly string _templateBasePath;

    public EmailTemplateService(ILogger<EmailTemplateService> logger)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _templateBasePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "EmailTemplates");

        if (!Directory.Exists(_templateBasePath))
        {
            Directory.CreateDirectory(_templateBasePath);
            _logger.LogWarning("Email templates directory created at {Path}", _templateBasePath);
        }
    }

    public async Task<string> RenderTemplateAsync<T>(string templateName, T model, CancellationToken cancellationToken = default) where T : class
    {
        var templatePath = Path.Combine(_templateBasePath, $"{templateName}.html");

        if (!File.Exists(templatePath))
        {
            _logger.LogError("Template {TemplateName} not found at {Path}", templateName, templatePath);
            throw new FileNotFoundException($"Email template '{templateName}' not found.", templatePath);
        }

        var templateContent = await File.ReadAllTextAsync(templatePath, cancellationToken);

        var renderedContent = ReplaceTokens(templateContent, model);

        return renderedContent;
    }

    private static string ReplaceTokens<T>(string template, T model) where T : class
    {
        var result = new StringBuilder(template);
        var properties = typeof(T).GetProperties();

        foreach (var property in properties)
        {
            var value = property.GetValue(model)?.ToString() ?? string.Empty;
            var token = $"{{{{{property.Name}}}}}";
            result.Replace(token, value);
        }

        return result.ToString();
    }
}
