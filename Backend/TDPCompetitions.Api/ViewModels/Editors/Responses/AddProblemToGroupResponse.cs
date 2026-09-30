using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Api.ViewModels.Editors.Responses
{
    public sealed record AddProblemToGroupResponse(
        Guid Id,
        string Name,
        Guid CompetitionId,
        Guid ProblemGroupId)
    {
        public AddProblemToGroupResponse(Problem problem) 
            : this (
                problem.Id,
                problem.Name,
                problem.CompetitionId,
                problem.ProblemGroupId
            )
        { }
    }
}
