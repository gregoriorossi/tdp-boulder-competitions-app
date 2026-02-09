namespace TDPCompetitions.Core.Errors
{
    public static class CompetitionsErrors
    {
        public static readonly Error NotFound = new Error("CompetitionError.NotFound", "Competition not found");
        public static readonly Error SlugNotAvailable = new Error("CompetitionError.SlugNotAvailable", "Slug not available");
        public static readonly Error NotOpen = new Error("CompetitionError.NotOpen", "Competition not open");
        public static readonly Error NotRegistered = new Error("CompetitionError.NotRegistered", "Competitor not registered");
    }

    public static class ProblemsGroupErrors
    {
        public static readonly Error NotFound = new Error("ProblemsGroup.NotFount", "ProblemsGroup not found");
    }

    public static class ProblemErrors
    {
        public static readonly Error NotFound = new Error("Problem.NotFount", "Problem not found");
    }
}
