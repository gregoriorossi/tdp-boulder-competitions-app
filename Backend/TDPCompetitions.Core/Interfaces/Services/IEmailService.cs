using TDPCompetitions.Core.Models;

namespace TDPCompetitions.Core.Interfaces.Services;

public interface IEmailService
{
    /// <summary>
    /// Sends an email message
    /// </summary>
    Task SendEmailAsync(EmailMessageSettings message, CancellationToken cancellationToken = default);
}
