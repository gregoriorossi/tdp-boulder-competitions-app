using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Api.ViewModels.Editors.Responses
{
    public sealed record SpecialProblemResponse(
        Guid Id,
        string Name,
        Guid CompetitionId)
    { 
      public SpecialProblemResponse(SpecialProblem problem)
            : this(
                problem.Id,
                problem.Name,
                problem.CompetitionId)
            { }
    }
}
