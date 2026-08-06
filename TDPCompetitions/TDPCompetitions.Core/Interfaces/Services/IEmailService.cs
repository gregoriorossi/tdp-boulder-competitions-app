using TDPCompetitions.Core.Models;

namespace TDPCompetitions.Core.Interfaces.Services;

public interface IEmailService
{
    /// <summary>
    /// Sends an email message
    /// </summary>
    Task SendEmailAsync(EmailMessage message, CancellationToken cancellationToken = default);
}
