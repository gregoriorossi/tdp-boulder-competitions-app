export const Errors = {
	Competitions: {
        NotFound: "CompetitionError.NotFound",
        SlugNotAvailable:"CompetitionError.SlugNotAvailable",
        NotOpen: "CompetitionError.NotOpen"
    },
    Registrations: {
        NotFound: "RegistrationsError.NotFound",
        NotRegistered: "RegistrationsError.NotRegistered",
        AlreadyRegistered: "RegistrationsError.AlreadyRegistered"
    },
    Competitors: {
        NotFound: "Competitors.NotFound",
        AdultDelete: "Competitors.AdultsCannotBeDeleted"
    },
    SpecialProblems: {
        NotFound: "SpecialProblem.NotFount"
    },
    Generic: "Generic"
}