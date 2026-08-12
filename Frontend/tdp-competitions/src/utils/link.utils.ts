export class LinkUtils {

	public static IdToRelativeUrl = (id: string) => {
		return `/editors/competition/${id}`;
	}

	public static SlugToRegistrationFormUrl = (slug: string): string => {
		return `${window.location.origin}/registrati/${slug}`;
	}

	public static SlugToLoginPageUrl = (slug: string): string => {
		return `${window.location.origin}/accedi?hint=${slug}`;
	}
}
