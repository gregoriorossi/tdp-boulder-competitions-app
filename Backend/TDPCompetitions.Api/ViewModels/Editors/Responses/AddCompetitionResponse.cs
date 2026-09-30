using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Api.ViewModels.Editors.Responses
{
    public sealed record AddCompetitionResponse(
        Guid Id,
        string Title,
        string Slug)
    {
        public AddCompetitionResponse(Competition competition)
            : this(
                competition.Id,
                competition.Title,
                competition.Slug)
        {}
    }
}
