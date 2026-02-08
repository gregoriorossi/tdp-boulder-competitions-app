using TDPCompetitions.Api.Helpers;
using TDPCompetitions.Api.ViewModels.Competitions;
using TDPCompetitions.Core.Entities;

namespace TDPCompetitions.Api.Mappers
{
    public class ViewModelToEntity
    {
        public static Competition AddCompetitionVMToCompetition(AddCompetitionVM model)
        {
            string slug = SlugHelper.Generate(model.Title);
            return new Competition
            {
                Title = model.Title,
                Slug = slug
            };
        }

        internal static async Task<Competition> UpdateCompetitionVMToCompetitionAsync(UpdateCompetitionVM model)
        {
            throw new NotImplementedException();
        }
    }
}
