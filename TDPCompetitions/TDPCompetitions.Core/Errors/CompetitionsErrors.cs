namespace TDPCompetitions.Core.Errors
{
    public static class CompetitionsErrors
    {
        public static readonly Error NotFound = new Error("CompetitionError.NotFound", "Competition not found");
        public static readonly Error SlugNotAvailable = new Error("CompetitionError.SlugNotAvailable", "Slug not available");
    }
}
