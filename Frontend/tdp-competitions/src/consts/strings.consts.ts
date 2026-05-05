import { CompetitionStatus } from "../models/competitions.models";
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
			Actions: {
				GetPublicUrl: 'Copia l\'url',
				ClickToCopy: 'Clicca qui per copiare',
				UrlCopied: 'Url copiato negli appunti!',
				ToDraft: 'Riporta a bozza',
				Start: 'Inizia gara',
				Close: 'Chiudi gara',
				Reopen: 'Riapri gara'
			},
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
				NewProblemGroup: 'Nuovo gruppo',
				EditProblemsGroups: 'Gestisci gruppi'
			},
			ManageRegistrations: {
				NewRegistration: 'Aggiungi registrazione',
				PrintAll: 'Stampa delibere',
				Table: {
					Name: 'Nome',
					Email: 'Email',
					BirthDate: 'Data di nascita',
					Minors: 'Minori'
				}
			}
		},
		RegistrationPage: {
			RegistrationsClosed: 'Registrazioni chiuse, al momento non è possibile registrarsi alla gara.'
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
				Title: "Il titolo della gara è obbligatorio",
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
			TitleNew: 'Nuovo blocco',
			Fields: {
				Title: "Nome"
			},
			Errors: {
				Title: "Il nome del blocco è obbligatorio"
			}
		},
		EditProblemsGroups: {
			Title: 'Gestisci gruppi'
		}
	},
	Forms: {
		AddProblemsGroup: {
			Title: 'Nuovo gruppo',
			ChooseColor: 'Scegli un colore',
			Errors: {
				Color: 'Il colore è obbligatorio'
			}
		},
		Registration: {
			TitleNew: 'Aggiungi registrazione',
			TitleEdit: (fullName: string) => `Vuoi modificare la prenotazione di ${fullName}?`,
			Fields: {
				FirstName: 'Nome',
				LastName: 'Cognome',
				Email: 'Email',
				BirthDate: 'Data di nascita',
				Gender: 'Genere',
				BirthPlace: 'Luogo di nascita',
				BirthProvince: 'Provincia di nascita',
				AddressCity: 'Città di residenza',
				AddressProvince: 'Provincia di residenza',
				AddressStreet: 'Via di residenza',
				AddressNumber: 'Numero civico di residenza',
				PhoneNumber: 'Numero di telefono'
			},
			Errors: {
				Email: 'Il valore inserito deve essere una email'
			}
		},
		Minor: {

		},
		Competition: {
			Fields: {
				Title: "Titolo",
				Date: "Data",
				Description: "Descrizione dell'evento",
				EmailText: "Testo email",
				RegistrationsOpen: "Registrazioni",
				BannerImage: "Immagine di copertina",
				PrivacyAttachment: 'Allegato privacy',
				PrivacyText: 'Testo informativa privacy'
			},
			Errors: {
				Title: "Il titolo della gara è obbligatorio",
				TitleLength: "Il titolo deve essere lungo almeno 5 caratteri",
				Date: "La data è obbligatoria",
				DateValid: "Inserisci una data valida"
			}
		},
	},
	Dialogs: {
		DeleteCompetition: {
			Title: 'Vuoi eliminare la gara?',
			Content: 'Una volta eliminata la gara non sarà più accedibile e i dati verranno persi'
		},
		DeleteCompetitor: {
			Title: (fullName: string) => `Vuoi eliminare la registrazione di ${fullName}?`,
			Content: 'Una volta eliminata, non sarà possibile recuperare i dati associati alla persona'
		},
		DeleteRegistration: {
			Title: (email: string) => `Vuoi eliminare la registrazione di ${email}?`,
			Content: 'Una volta eliminata, non sarà possibile recuperare i dati associati alla persona e ai minori legati alla prenotazione'
		},
		DeleteSpecialProblem: {
			Title: (title: string) => `Vuoi eliminare il blocco ${title}?`,
			Content: 'Una volta eliminato il blocco e i dati associati verranno persi'
		},
		DeleteProblem: {
			Title: (title: string) => `Vuoi eliminare il blocco ${title}?`,
			Content: 'Una volta eliminato il blocco e i dati associati verranno persi'
		},
		DeleteProblemsGroup: {
			Title: `Vuoi eliminare il gruppo?`,
			Content: 'Una volta eliminato il gruppo i blocchi associati verranno persi'
		},
		DeleteBannerImage: {
			Title: 'Vuoi cancellare l\'immagine di copertina?',
			Content: ''
		},
		UpdateStatus: {
			Title: (title: string, status: CompetitionStatus) => {
				switch (status) {
					case CompetitionStatus.DRAFT:
						return `Vuoi mettere in stato bozza la gara ${title}?`;
					case CompetitionStatus.OPEN:
						return `Vuoi iniziare la gara ${title}?`;
					case CompetitionStatus.CLOSED:
						return `Vuoi chiudere la gara ${title}?`;
				}
			},
			Content: 'La modifica è reversibile è puoi tornare indietro se necessario'
		}
	},
	ColorCodes: {
		White: '#FFFFFF',
		Blue: '#0000FF',
		Green: '#00FF00',
		Yellow: '#FFFF00',
		Red: '#FF0000',
		Black: '#000000',
		Orange: '#FFA500',
		Brown: '#A52A2A',
		Cyan: '#00FFFF',
		Magenta: '#FF00FF',
		Gray: '#808080',
		LightGray: '#D3D3D3',
		Navy: '#000080',
		Teal: '#008080'
	},
	CompetitionStatus: {
		Draft: 'Bozza',
		Open: 'Aperta',
		Closed: 'Chiusa'
	},
	GenericError: 'C\'è stato un errore, riprovare più tardi.',
	Add: 'Aggiungi',
	Cancel: 'Annulla',
	Confirm: 'Conferma',
	Create: 'Crea',
	Delete: 'Elimina',
	Document: 'Documento',
	Details: 'Dettagli',
	Print: 'Stampa',
	Edit: 'Modifica',
	Save: 'Salva',
	MoveUp: 'Sposta su',
	MoveDown: 'Sposta giù',
	Male: 'Uomo',
	Female: 'Donna',
	OpenPlural: 'Aperte',
	ClosedPlural: 'Chiuse',
	SupportedImageFormats: 'Formati supportati: JPG, PNG. (Max. 3MB)',
	Errors: {
		DateInvalid: 'Inserire una data valida',
		MinLength: (num: number) => `Il campo deve contenere almeno ${num} caratteri`,
		Mandatory: 'Campo obbligatorio',
		ImageTooLarge: (limit: string) => `L'immagine non può superare ${limit}`,
		FileTooLarge: (limit: string) => `Il file non può superare ${limit}`,
	}
}

interface IErrorStrings {
	[key: string]: string;
}
export const ERROR_STRINGS: IErrorStrings = {};
ERROR_STRINGS[Errors.Competitions.SlugNotAvailable] = 'Esiste già una gara con lo stesso nome';
ERROR_STRINGS[Errors.Competitions.NotFound] = 'Competizione non trovata';
ERROR_STRINGS[Errors.SpecialProblems.NotFound] = "Blocco non trovato";
ERROR_STRINGS[Errors.Registrations.NotFound] = "Registrazione non trovata";
ERROR_STRINGS[Errors.Registrations.AlreadyRegistered] = "Utente già registrato";
ERROR_STRINGS[Errors.Registrations.NotRegistered] = "Utente non registrato";
ERROR_STRINGS[Errors.Competitors.NotFound] = "Atleta non trovato";
ERROR_STRINGS[Errors.Competitors.AdultDelete] = "Per eliminare un adulto è necessario eliminare l'intera registrazione";

