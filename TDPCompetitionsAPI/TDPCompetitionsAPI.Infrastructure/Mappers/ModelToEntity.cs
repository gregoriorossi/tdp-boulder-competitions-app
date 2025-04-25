using TDPCompetitionsAPI.Infrastructure.Models;

namespace TDPCompetitionsAPI.Web.Mappers
{
    /// <summary>
    /// Entity from model mapping
    /// </summary>
    public static class ModelToEntity
    {
        public static Core.Entities.Competition CreateModelFromEntity(Competition model)
        {
            return new Core.Entities.Competition()
            {
                Id = model.Id,  
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
