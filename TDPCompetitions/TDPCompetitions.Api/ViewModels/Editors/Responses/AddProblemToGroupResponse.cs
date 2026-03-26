using System.ComponentModel.DataAnnotations;
using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Api.ViewModels.Editors.Responses
{
    public class AddProblemToGroupResponse
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; } = default!;

        [Required]
        public Guid CompetitionId { get; set; } = default!;

        [Required]
        public Guid ProblemGroupId { get; set; } = default!;

        public AddProblemToGroupResponse(Problem problem)
        {
            Id = problem.Id;
            Name = problem.Name;
            ProblemGroupId = problem.ProblemGroupId;
            Name = problem.Name;
        }
    }
}
