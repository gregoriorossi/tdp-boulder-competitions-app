import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button, Alert } from "@mui/material";
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

const PageStrings = STRINGS.Pages.EditorsAllCompetitionsPage;

export function EditorsAllCompetitionsPage() {
	const { data: response, isLoading, error } = useCompetitions();
	const [deleteFormDialogOpen, setDeleteFormDialogOpen] = React.useState<boolean>(false);
	const [addCompetitionModalOpen, setAddCompetitionModalOpen] = React.useState<boolean>(false);
	const [selectedCompetitionId, setSelectedCompetitionId] = React.useState<string | null>(null);
	const { data: deleteResponse, error: errorDelete, mutateAsync: deleteCompetitionAsync, isPending: isDeletePending } = useDeleteCompetition();

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
				<Alert severity="error"><ErrorMessage errorCode={response?.error?.code ?? ""} /></Alert>
			}

			{
				(errorDelete || (deleteResponse && !deleteResponse.value && !isLoading)) &&
				<Alert severity="error"><ErrorMessage errorCode={deleteResponse?.error?.code ?? ""} /></Alert>
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
								<TableCell colSpan={5}>{PageStrings.Table.TitleColumn}</TableCell>
								<TableCell colSpan={3}>{PageStrings.Table.DateColumn}</TableCell>
								<TableCell colSpan={2}>{PageStrings.Table.ActiveColumn}</TableCell>
								<TableCell colSpan={2} />
							</TableRow>
						</TableHead>
						<TableBody>
							{
								response?.value
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

													<Button title="Cancella" onClick={() => onDeleteClick(competition.id)}>
														<DeleteIcon />
													</Button>
												</ButtonGroup>
											</TableCell>
										</TableRow>
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