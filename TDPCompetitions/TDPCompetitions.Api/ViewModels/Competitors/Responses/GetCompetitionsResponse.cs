using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Api.ViewModels.Competitors.Responses;

public class GetCompetitionsResponse
{
    public Guid Id { get; set; }

    public string Title { get; set; } = default!;

    public string Slug { get; set; }

    public GetCompetitionsResponse(Competition competition)
    {
        Id = competition.Id;
        Title = competition.Title;
        Slug = competition.Slug;
    }
}
