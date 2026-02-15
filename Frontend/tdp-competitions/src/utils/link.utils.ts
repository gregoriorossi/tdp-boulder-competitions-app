export class LinkUtils {

	public static IdToRelativeUrl = (id: string) => {
		return `/editors/competitions/${id}`;
	}

	public static SlugToPublicFormUrl = (slug: string): string => {
		return `${import.meta.env.VITE_BASE_URL}/form/${slug}`;
	}
}
