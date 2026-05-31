export class LinkUtils {

	public static IdToRelativeUrl = (id: string) => {
		return `/editors/competition/${id}`;
	}

	public static SlugToRegistrationFormUrl = (slug: string): string => {
		return `${import.meta.env.VITE_BASE_URL}/registrati/${slug}`;
	}
}
