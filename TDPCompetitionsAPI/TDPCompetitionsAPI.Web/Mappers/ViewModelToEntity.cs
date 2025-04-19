using TDPCompetitionsAPI.Core.Entities;
using TDPCompetitionsAPI.Web.Helpers;
using TDPCompetitionsAPI.Web.ViewModels;

namespace TDPCompetitionsAPI.Web.Mappers
{
    /// <summary>
    /// ViewModel to Entity mapping
    /// </summary>
    public static class ViewModelToEntity
    {
        public static Competition CreateCompetitionFromViewModel(CreateCompetitionViewModel model)
        {
            string slug = SlugHelper.Generate(model.Title);

            return new Competition()
            {
                Title = model.Title,
                Date = model.Date,
                Slug = slug
            };
        }
    }
}
