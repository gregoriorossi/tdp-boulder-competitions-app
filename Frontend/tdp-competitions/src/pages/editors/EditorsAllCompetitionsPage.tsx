import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button, Alert, styled, tableCellClasses } from "@mui/material";
import { Link } from "react-router-dom";
import { useCompetitions, useDeleteCompetition } from "../../queries/competitions.queries";
import { STRINGS } from "../../consts/strings.consts";
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { LinkUtils } from "../../utils/link.utils";
import { ErrorMessage } from "../../components/ErrorMessage";
import { DateUtils } from "../../utils/date.utils";
import classNames from "../../App.module.scss";
import { EditorsPageWrapper } from "./EditorsPageWrapper";
import { Spinner } from "../../components/Spinner";
import React from "react";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import { NewCompetitionModal } from "../../components/modals/NewCompetitionModal";
import { Errors } from "../../consts/errors.consts";

const PageStrings = STRINGS.Pages.EditorsAllCompetitionsPage;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

export function EditorsAllCompetitionsPage() {
	const { data: response, isLoading, error } = useCompetitions();
	const [deleteFormDialogOpen, setDeleteFormDialogOpen] = React.useState<boolean>(false);
	const [addCompetitionModalOpen, setAddCompetitionModalOpen] = React.useState<boolean>(false);
	const [selectedCompetitionId, setSelectedCompetitionId] = React.useState<string | null>(null);
	const { data: deleteResponse, error: errorDelete, mutateAsync: deleteCompetitionAsync, addSpecialProblemIsPending: isDeletePending } = useDeleteCompetition();

	const onDeleteClick = (competitionId: string): void => {
		setSelectedCompetitionId(competitionId);
		setDeleteFormDialogOpen(true);
	}

	const onDeleteCompetitionHandler = async (): Promise<void> => {
		try {
			await deleteCompetitionAsync(selectedCompetitionId!);

		} catch (e) {
			console.log(e);
		}

		setSelectedCompetitionId(null);
		setDeleteFormDialogOpen(false);
	}

	return (<EditorsPageWrapper title={PageStrings.Title}>
		<div className={classNames.editorsAllCompetitionsPage}>
			<div className={classNames.actionsSection}>
				<Button
					onClick={() => setAddCompetitionModalOpen(true)}
					variant="contained"
					endIcon={<AddIcon />}>
					{PageStrings.NewCompetition}
				</Button>
			</div>
			{
				(response?.isSuccess && response?.value.length === 0) &&
				<Alert severity="info">{PageStrings.NoCompetitionsAvailable}</Alert>
			}

			{
				(error || (!response?.isSuccess && !isLoading)) &&
				<ErrorMessage errorCode={response?.error?.code ?? ""} />
			}

			{
				(errorDelete || (deleteResponse && !deleteResponse.value && !isLoading)) &&
				<ErrorMessage errorCode={deleteResponse?.error?.code ?? ""} />
			}

			{
				(isLoading || isDeletePending) && <Spinner />
			}

			{
				((response?.value?.length ?? 0) > 0) &&

				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<StyledTableCell colSpan={5}>{PageStrings.Table.TitleColumn}</StyledTableCell>
								<StyledTableCell colSpan={3}>{PageStrings.Table.DateColumn}</StyledTableCell>
								<StyledTableCell colSpan={2}>{PageStrings.Table.ActiveColumn}</StyledTableCell>
								<StyledTableCell colSpan={2} />
							</TableRow>
						</TableHead>
						<TableBody>
							{
								response?.value
									.map((competition, idx) => (
										<StyledTableRow key={idx}>
											<StyledTableCell colSpan={5}>{competition.title}</StyledTableCell>
											<StyledTableCell colSpan={3}>
												{DateUtils.ToDateTime(competition.date)}
											</StyledTableCell>
											<StyledTableCell colSpan={2}>{competition.isOpen
												? <CheckIcon className={classNames.greenIcon} />
												: <DoNotDisturbIcon className={classNames.redIcon} />}
											</StyledTableCell>
											<StyledTableCell colSpan={2} align="right">
												<ButtonGroup variant="contained" aria-label="Azioni form">
													<Link to={LinkUtils.IdToRelativeUrl(competition.id)}>
														<Button title="Dettagli"><CreateIcon /></Button>
													</Link>

													<Button title={STRINGS.Delete} onClick={() => onDeleteClick(competition.id)}>
														<DeleteIcon />
													</Button>
												</ButtonGroup>
											</StyledTableCell>
										</StyledTableRow>
									))
							}
						</TableBody>
					</Table>
				</TableContainer>
			}
		</div>

		<ConfirmationDialog
			isOpen={deleteFormDialogOpen}
			title={STRINGS.Dialogs.DeleteCompetition.Title}
			cancelBtnLabel={STRINGS.Cancel}
			confirmBtnLabel={STRINGS.Delete}
			isLoading={isDeletePending}
			error={errorDelete ? Errors.Generic : ''}
			content={STRINGS.Dialogs.DeleteCompetition.Content}
			onCancel={() => { setDeleteFormDialogOpen(false) }}
			onClose={() => { setDeleteFormDialogOpen(false) }}
			onConfirm={onDeleteCompetitionHandler} />

		<NewCompetitionModal
			open={addCompetitionModalOpen}
			onClose={() => { setAddCompetitionModalOpen(false); }}
			onCreated={() => { setAddCompetitionModalOpen(false); }} />
	</EditorsPageWrapper>);
}