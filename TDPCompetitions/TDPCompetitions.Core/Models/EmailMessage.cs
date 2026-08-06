using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Core.Models;

public record EmailMessage
{
    public EmailMessage() {     }


    public EmailMessage(Competition competition, Registration registration, string templateId)
    {
        string minorsList = string.Join("<br/> ", registration.Minors.Select(m => $"{m.FirstName} {m.LastName} ({m.BirthDate:dd/MM/yyyy})"));
        To = registration.Email;
        Subject = competition.EmailSubject;
        Body = competition.EmailText;
        TemplateId = templateId;
        Placeholders = new Dictionary<string, string>
        {
            { "{Nome}", registration.Competitor.FirstName },
            { "{Cognome}", registration.Competitor.LastName },
            { "{DataNascita}", registration.Competitor.BirthDate.ToString("dd/MM/yyyy") },
            { "{Minori}", $"<p>{minorsList}</p>" }
        };
    }

    public string To { get; init; }

    public string Subject { get; init; }

    public string Body { get; init; }

    public bool IsHtml { get; init; } = true;

    public string? From { get; init; }

    public string? ReplyTo { get; init; }

    public List<string>? Cc { get; init; }

    public List<string>? Bcc { get; init; }

    public Dictionary<string, byte[]>? Attachments { get; init; }

    public Dictionary<string, string>? Placeholders { get; init; }

    public string TemplateId { get; init; }
}
