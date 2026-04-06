namespace TDPCompetitions.Core.Errors
{
    public static class CompetitionsErrors
    {
        public static readonly Error NotFound = new Error("CompetitionError.NotFound", "Competition not found");
        public static readonly Error SlugNotAvailable = new Error("CompetitionError.SlugNotAvailable", "Slug not available");
        public static readonly Error NotOpen = new Error("CompetitionError.NotOpen", "Competition not open");
    }

    public static class ProblemsGroupErrors
    {
        public static readonly Error NotFound = new Error("ProblemsGroup.NotFound", "ProblemsGroup not found");
    }

    public static class ProblemErrors
    {
        public static readonly Error NotFound = new Error("Problem.NotFound", "Problem not found");
    }

    public static class SpecialProblemErrors
    {
        public static readonly Error NotFound = new Error("SpecialProblem.NotFound", "Special Problem not found");
    }

    public static class RegistrationsErrors
    {
        public static readonly Error NotFound = new Error("RegistrationsError.NotFound", "Registration not found");
        public static readonly Error NotRegistered = new Error("RegistrationsError.NotRegistered", "Competitor not registered");
        public static readonly Error AlreadyRegistered = new Error("RegistrationsError.AlreadyRegistered", "Competitor is registered already");

    }

    public static class CompetitorsErrors
    {
        public static readonly Error NotFound = new Error("Competitors.NotFound", "Competitor not found");
        public static readonly Error AdultDelete = new Error("Competitors.AdultsCannotBeDeleted", "Only minors can be deleted");
    }
}
