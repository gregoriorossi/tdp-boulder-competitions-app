import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from "@mui/material";
import { ErrorMessage } from "../ErrorMessage";
import { Spinner } from "../Spinner";
import { RegistrationRow } from "./RegistrationRow";
import { sortRegistrations } from "../../utils/competitions.utils";
import classNames from "../../App.module.scss";
import { useRegistrationsByCompetitionsId } from "../../queries/registrations.queries";
import { STRINGS } from "../../consts/strings.consts";
import { RegistrationModal } from "../modals/RegistrationModal";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
const ManageRegistraionsStrings = STRINGS.Pages.EditorCompetitionPage.ManageRegistrations;

interface IManageRegistrationsProps {
	competitionId: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

export function ManageRegistrations(props: IManageRegistrationsProps) {
	const { competitionId } = props;
	const { data: response, isLoading, error } = useRegistrationsByCompetitionsId(competitionId);
	const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState<boolean>(false);

	if (isLoading) {
		return <Spinner />;
	}

	if (error || response?.isFailure) {
		return <ErrorMessage errorCode={response?.error?.code ?? ''} />
	}

	return <div className={classNames.manageRegistrations}>
		<div className={classNames.actionsContainer }>
			<Button
				onClick={() => setIsRegistrationModalOpen(true)}
				variant="contained"
				endIcon={<AddIcon />}>
				{ManageRegistraionsStrings.NewRegistration}
			</Button>
		</div>

		<TableContainer component={Paper}>
		[rifare la tabella con flex]
			<Table className={classNames.table}>
				<TableHead>
					<TableRow>
						<StyledTableCell>{ManageRegistraionsStrings.Table.Name}</StyledTableCell>
						<StyledTableCell>{ManageRegistraionsStrings.Table.Email}</StyledTableCell>
						<StyledTableCell>{ManageRegistraionsStrings.Table.BirthDate}</StyledTableCell>
						<StyledTableCell>{ManageRegistraionsStrings.Table.Minors}</StyledTableCell>
						<StyledTableCell />
					</TableRow>
				</TableHead>
				<TableBody>
					{
						response?.value
							.sort(sortRegistrations)
							.map(r => <RegistrationRow registration={r} key={r.email} />)
					}
				</TableBody>
			</Table>
			<RegistrationModal
				open={isRegistrationModalOpen}
				onAdded={() => { }}
				onUpdated={() => { }}
				competitionId={competitionId}
				onClose={() => setIsRegistrationModalOpen(false)} />
		</TableContainer>
	</div>;
}