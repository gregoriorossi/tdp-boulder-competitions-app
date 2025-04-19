namespace TDPCompetitionsAPI.Web.Helpers
{
    public class SlugHelper
    {
        public static string Generate(string str)
        {
            var config = new Slugify.SlugHelper.Config()
            {
                ForceLowerCase = true,
                CollapseWhiteSpace = true
            };
            config.CharacterReplacements.Add(" ", "-");
            var slugify = new Slugify.SlugHelper(config);
            var slug = slugify.GenerateSlug(str);
            return slug;
        }
    }
}
