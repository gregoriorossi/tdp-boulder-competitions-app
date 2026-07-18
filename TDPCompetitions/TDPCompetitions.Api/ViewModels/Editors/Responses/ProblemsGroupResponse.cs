using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Api.ViewModels.Editors.Responses
{
    public sealed record ProblemsGroupResponse(
        Guid Id,
        int Order,
        string ColorCode,
        Guid CompetitionId,
        ICollection<ProblemResponse> Problems)
    {
        public ProblemsGroupResponse(ProblemsGroup group)
            : this(
                group.Id,
                group.Order,
                group.ColorCode,
                group.CompetitionId,
                group.Problems.Select(p => new ProblemResponse(p)).ToList())
        { }
    }
}
