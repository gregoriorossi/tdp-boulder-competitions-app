using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;
using TDPCompetitions.Core.Interfaces.Services;
using TDPCompetitions.Core.Models;

namespace TDPCompetitions.Infrastracture.Services;

public class EmailService : IEmailService
{
    private readonly EmailSettings _emailSettings;
    private readonly ILogger<EmailService> _logger;
    private readonly IEmailTemplateService _templateService;

    public EmailService(
        IOptions<EmailSettings> emailSettings,
        ILogger<EmailService> logger,
        IEmailTemplateService templateService)
    {
        _emailSettings = emailSettings.Value ?? throw new ArgumentNullException(nameof(emailSettings));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _templateService = templateService ?? throw new ArgumentNullException(nameof(templateService));
    }

    public async Task SendEmailAsync(EmailMessage message, CancellationToken cancellationToken = default)
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

            using var mailMessage = new MailMessage
            {
                From = new MailAddress(
                    message.From ?? _emailSettings.SenderEmail,
                    _emailSettings.SenderName),
                Subject = subject,
                Body = fullbody,
                IsBodyHtml = message.IsHtml
            };

            mailMessage.To.Add(message.To);

            if (message.ReplyTo != null)
            {
                mailMessage.ReplyToList.Add(message.ReplyTo);
            }

            if (message.Cc != null)
            {
                foreach (var cc in message.Cc)
                {
                    mailMessage.CC.Add(cc);
                }
            }

            if (message.Bcc != null)
            {
                foreach (var bcc in message.Bcc)
                {
                    mailMessage.Bcc.Add(bcc);
                }
            }

            if (message.Attachments != null)
            {
                foreach (var attachment in message.Attachments)
                {
                    var stream = new MemoryStream(attachment.Value);
                    mailMessage.Attachments.Add(new Attachment(stream, attachment.Key));
                }
            }

            using var smtpClient = new SmtpClient(_emailSettings.SmtpServer, _emailSettings.SmtpPort)
            {
                Credentials = new NetworkCredential(_emailSettings.Username, _emailSettings.Password),
                EnableSsl = _emailSettings.EnableSsl
            };

            await smtpClient.SendMailAsync(mailMessage, cancellationToken);

            _logger.LogInformation("Email sent successfully to {To}", message.To);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send email to {To}", message.To);
        }
    }
}
