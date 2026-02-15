import { Errors } from "./errors.consts";

export const STRINGS = {
	Pages: {
		EditorsAllCompetitionsPage: {
			NoCompetitionsAvailable: 'Nessuna gara disponibile',
			Table: {
				TitleColumn: 'Titolo',
				DateColumn: 'Data',
				ActiveColumn: 'Attivo'
			},
		}
	},
	GenericError: 'C\'è stato un errore, riprovare più tardi.',
}

interface IErrorStrings {
	[key: string]: string;
}
export const ERROR_STRINGS: IErrorStrings = {};
ERROR_STRINGS[Errors.Competitions.SlugNotAvailable] = 'Esiste già una gara con lo stesso nome';