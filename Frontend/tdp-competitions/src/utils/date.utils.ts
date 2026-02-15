export class DateUtils {
	public static StringToDate = (str: string): Date => {
		return new Date(str);
	}

	public static ToDateOnly = (date: Date): string => {
		const formatter = new Intl.DateTimeFormat('it-IT', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		});

		return formatter.format(date);
	}

	public static ToDateTime = (date: Date): string => {
		const formatter = new Intl.DateTimeFormat('it-IT', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit'
		});

		return formatter.format(date);
	}
}