using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;
using TDPCompetitions.Core.Interfaces.Services;
using TDPCompetitions.Core.Models;
using Resend;

namespace TDPCompetitions.Infrastracture.Services;

public class EmailService : IEmailService
{
    private readonly EmailSettings _emailSettings;
    private readonly ILogger<EmailService> _logger;
    private readonly IEmailTemplateService _templateService;
    private readonly IResend _resend;

    public EmailService(
        IOptions<EmailSettings> emailSettings,
        ILogger<EmailService> logger,
        IEmailTemplateService templateService,
        IResend resend)
    {
        _emailSettings = emailSettings.Value ?? throw new ArgumentNullException(nameof(emailSettings));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _templateService = templateService ?? throw new ArgumentNullException(nameof(templateService));
        _resend = resend ?? throw new ArgumentNullException(nameof(resend));
    }

    public async Task SendEmailAsync(EmailMessageSettings message, CancellationToken cancellationToken = default)
    {
        try
        {
            string body = message.Body;
            string subject = message.Subject;

            foreach (var placeholder in message.Placeholders ?? new Dictionary<string, string>())
            {
                subject = subject.Replace(placeholder.Key, placeholder.Value);
                body = body.Replace(placeholder.Key, placeholder.Value);
            }

            var fullbody = await _templateService.RenderTemplateAsync(
                message.TemplateId, 
                new { Body = body, Subject = subject}, 
                cancellationToken);

            var emailMessage = new EmailMessage()
            {
                To = message.To,
                From = message.From ?? _emailSettings.SenderEmail,
                Subject = subject,
                HtmlBody = fullbody
            };

            await _resend.EmailSendAsync(emailMessage, cancellationToken);

            _logger.LogInformation("Email sent successfully to {To}", message.To);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send email to {To}", message.To);
        }
    }
}
