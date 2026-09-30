using Slugify;

namespace TDPCompetitions.Api.Helpers
{
    public class SlugHelper
    {
        public static string Generate(string str)
        {
            var config = new SlugHelperConfiguration()
            {
                ForceLowerCase = true,
                CollapseDashes = true
            };
            var slugify = new Slugify.SlugHelper(config);
            var slug = slugify.GenerateSlug(str);
            return slug;
        }
    }
}
