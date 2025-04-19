using TDPCompetitionsAPI.Infrastructure.Models;

namespace TDPCompetitionsAPI.Web.Mappers
{
    /// <summary>
    /// Entity to Model mapping
    /// </summary>
    public static class EntityToModel
    {
        public static Competition CreateEntityFromModel(Core.Entities.Competition model)
        {
            return new Competition()
            {
                Title = model.Title,
                Date = model.Date,
                AreRankingsVisible = model.AreRankingsVisible,
                Description = model.Description,
                EmailBody = model.EmailBody,
                EmailSubject = model.EmailSubject,
                IsRegistrationOpen = model.IsRegistrationOpen,
                Slug = model.Slug,
                //State = model.State
                
            };
        }
    }
}
