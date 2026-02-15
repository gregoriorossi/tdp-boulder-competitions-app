import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button, Alert, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import CompetitionsMappers from "../../mappers/competitions.mappers";
import { useCompetitions } from "../../queries/competitions.queries";
import { STRINGS } from "../../consts/strings.consts";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { LinkUtils } from "../../utils/link.utils";
import { ErrorMessage } from "../../components/ErrorMessage";
import { DateUtils } from "../../utils/date.utils";
import classNames from "../../App.module.scss";

const PageStrings = STRINGS.Pages.EditorsAllCompetitionsPage;

export function EditorsAllCompetitionsPage() {
	const { data: response, isLoading, error } = useCompetitions();

	return (<>
		{
			(response?.isSuccess && response?.value.length === 0) &&
			<Alert severity="info">{PageStrings.NoCompetitionsAvailable}</Alert>
		}

		{
			(error || (!response?.isSuccess && !isLoading)) &&
			<Alert severity="error"><ErrorMessage errorCode={response?.error?.code ?? ""} /></Alert>
		}

		{
			isLoading && <CircularProgress />
		}

		{
		 ((response?.value?.length ?? 0) > 0) &&
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell colSpan={5}>{PageStrings.Table.TitleColumn}</TableCell>
						<TableCell colSpan={3}>{PageStrings.Table.DateColumn}</TableCell>
						<TableCell colSpan={2}>{PageStrings.Table.ActiveColumn}</TableCell>
						<TableCell colSpan={2} />
					</TableRow>
				</TableHead>
				<TableBody>
					{
						response?.value
							.map(c => CompetitionsMappers.ToICompetition(c))
							.map((competition, idx) => (
								<TableRow key={idx}>
									<TableCell colSpan={5}>{competition.title}</TableCell>
									<TableCell colSpan={3}>
										{DateUtils.ToDateTime(competition.date)}
									</TableCell>
									<TableCell colSpan={2}>{competition.isOpen
										? <CheckIcon className={classNames.greenIcon} />
										: <DoNotDisturbIcon className={classNames.redIcon} />}
									</TableCell>
									<TableCell colSpan={2} align="right">
										<ButtonGroup variant="contained" aria-label="Azioni form">
											<Link to={LinkUtils.IdToRelativeUrl(competition.id)}>
												<Button title="Dettagli"><CreateIcon /></Button>
											</Link>

											<Button title="Cancella"><DeleteIcon /></Button>
										</ButtonGroup>
									</TableCell>
								</TableRow>
							))
					}
				</TableBody>
			</Table>
		</TableContainer>
	}

	</>);
}