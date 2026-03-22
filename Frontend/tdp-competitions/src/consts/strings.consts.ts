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
		},
		EditorCompetitionPage: {
			Tabs: {
				Info: 'Informazioni',
				Problems: 'Blocchi',
				Registrations: 'Registrazioni',
				Rankings: 'Classifiche'
			},
			ManageProblems: {
				SpecialProblems: 'Blocchi premio',
				Problems: 'Blocchi',
				NewSpecialProblem: 'Nuovo blocco premio',
				NewProblemGroup: 'Nuovo gruppo'
			}
		}
	},
	Modals: {
		NewCompetition: {
			Title: "Crea una nuova gara",
			Fields: {
				Title: "Nome",
				Date: "Data"
			},
			Errors: {
				Title: "Il nome della form è obbligatorio",
				TitleLength: "Il titolo deve essere lungo almeno 5 caratteri",
				Date: "La data è obbligatoria",
				DateValid: "Inserisci una data valida"
			}
		},
		SpecialProblem: {
			New: 'Crea un nuovo blocco premio',
			Edit: 'Modifica blocco premio',
			Fields: {
				Title: "Nome"
			},
			Errors: {
				Title: 'Il nome del blocco è obbligatorio',
				TitleLength: "Il nome del blocco deve essere lungo almeno 5 caratteri",
			}
		},
		Problem: {
			Title: 'Modifica blocco',
			Fields: {
				Title: "Nome"
			},
			Errors: {
				Title: "Il nome del blocco è obbligatorio"
			}
		}
	},
	Dialogs: {
		DeleteCompetition: {
			Title: 'Vuoi eliminare la gara?',
			Content: 'Una volta eliminata la gara non sarà più accedibile e i dati verranno persi'
		},
		DeleteSpecialProblem: {
			Title: (title: string) => `Vuoi eliminare il blocco ${title}?`,
			Content: 'Una volta eliminato il blocco e i dati associati verranno persi'
		},
		DeleteProblem: {
			Title: (title: string) => `Vuoi eliminare il blocco ${title}?`,
			Content: 'Una volta eliminato il blocco e i dati associati verranno persi'
		}
	},
	ColorCodes: {
		White: '#FFFFFF',
		Blue: '#0000FF',
		Green: '#00FF00',
		Yellow: '#FFFF00',
		Red: '#FF0000',
		Black: '#000000',
	},
	GenericError: 'C\'è stato un errore, riprovare più tardi.',
	Cancel: 'Annulla',
	Create: 'Crea',
	Delete: 'Elimina',
	Edit: 'Modifica',
	Save: 'Salva'
}

interface IErrorStrings {
	[key: string]: string;
}
export const ERROR_STRINGS: IErrorStrings = {};
ERROR_STRINGS[Errors.Competitions.SlugNotAvailable] = 'Esiste già una gara con lo stesso nome';
ERROR_STRINGS[Errors.Competitions.NotFound] = 'Competizione non trovata';
ERROR_STRINGS[Errors.SpecialProblems.NotFound] = "Blocco non trovato";