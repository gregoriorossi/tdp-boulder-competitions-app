using TDPCompetitions.Core.Enums;
using TDPCompetitions.Core.Models;

namespace TDPCompetitions.Api.ViewModels.Editors.Responses
{
    public sealed record RankingCompetitorResponse(
        int Position,
        double Score,
        Guid CompetitorId,
        string FirstName,
        string LastName,
        Gender Gender,
        bool IsMinor)
    {
        public RankingCompetitorResponse(RankingCompetitor model)
            : this(
                model.Position,
                model.Score,
                model.CompetitorId,
                model.FirstName,
                model.LastName,
                model.Gender,
                model.IsMinor)
        {}
    }
}
