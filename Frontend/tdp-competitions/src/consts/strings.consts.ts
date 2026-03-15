import { Errors } from "./errors.consts";

export const STRINGS = {
	Pages: {
		EditorsAllCompetitionsPage: {
			Title: 'Tutte le gare',
			NewCompetition: 'Nuova gara',
			NoCompetitionsAvailable: 'Nessuna gara disponibile',
			Table: {
				TitleColumn: 'Titolo',
				DateColumn: 'Data',
				ActiveColumn: 'Attivo'
			},
		}
	},
	Modals: {
		NewCompetition: {
			Title: "Crea una nuova gara",
			Errors: {
				Title: "Il nome della form è obbligatorio",
				TitleLength: "Il titolo deve essere lungo almeno 5 caratteri",
				Date: "La data è obbligatoria"
			}
		}
	},
	Dialogs: {
		DeleteCompetition: {
			Title: 'Vuoi eliminare la gara?',
			Content: 'Una volta eliminata la gara non sarà più accedibile e i dati saranno persi'
		}
	},
	GenericError: 'C\'è stato un errore, riprovare più tardi.',
	Cancel: 'Annulla',
	Create: 'Crea',
	Delete: 'Elimina'
}

interface IErrorStrings {
	[key: string]: string;
}
export const ERROR_STRINGS: IErrorStrings = {};
ERROR_STRINGS[Errors.Competitions.SlugNotAvailable] = 'Esiste già una gara con lo stesso nome';
ERROR_STRINGS[Errors.Competitions.NotFound] = 'Competizione non trovata';