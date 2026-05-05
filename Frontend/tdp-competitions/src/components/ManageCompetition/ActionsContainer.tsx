import { CopyUrlButton } from "../ManageRegistrations/CopyUrlButton";
import { CompetitionStatus, type ICompetitionInfo } from "../../models/competitions.models";
import classNames from "../../App.module.scss";
import { STRINGS } from "../../consts/strings.consts";
import { useUpdateCompetitionStatus } from "../../queries/competitions.queries";
import { useState } from "react";
import ConfirmationDialog from "../ConfirmationDialog";
import { Errors } from "../../consts/errors.consts";
import { Button } from "@mui/material";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const PageStrings = STRINGS.Pages.EditorCompetitionPage;

interface IActionsContainerProps {
	competition: ICompetitionInfo;
}



export function ActionsContainer(props: IActionsContainerProps) {
	const { competition } = props;

	const { error: updateStatusError, mutateAsync: updateStatusMutateAsync, isPending: updateStatusIsPending } = useUpdateCompetitionStatus(competition.id);
	const [confirmationDialogOpen, setConfirmationDialogOpen] = useState<boolean>(false);
	const [newStatus, setNewStatus] = useState<CompetitionStatus | null>(null);

	const onButtonClick = (newStatus: CompetitionStatus): void => {
		setConfirmationDialogOpen(true);
		setNewStatus(newStatus);
	}

	const onUpdateHandler = async (): Promise<void> => {
		await updateStatusMutateAsync({
			competitionId: competition.id,
			status: newStatus!
		});
		setConfirmationDialogOpen(false);
		setNewStatus(null);
	}

	const errorMessageStr: string | null = updateStatusError ? Errors.Generic : null;

	return <div className={classNames.actionsContainer}>
		<CopyUrlButton competitionSlug={props.competition.slug} />
		<div>
			{
				competition.status === CompetitionStatus.DRAFT &&
				<Button
					title={PageStrings.Actions.Start}
					variant="contained"
					color="success"
					onClick={() => onButtonClick(CompetitionStatus.OPEN)}>
					<PlayCircleFilledWhiteIcon />&nbsp;
					{PageStrings.Actions.Start}
				</Button>
			}

			{
				competition.status === CompetitionStatus.OPEN &&
				<>
					<Button
						title={PageStrings.Actions.Close}
						variant="contained"
						color="error"
						onClick={() => onButtonClick(CompetitionStatus.CLOSED)}>
						<StopCircleIcon />&nbsp;
						{PageStrings.Actions.Close}
					</Button>&nbsp;
					<Button
						title={PageStrings.Actions.ToDraft}
						variant="contained"
						color="warning"
						onClick={() => onButtonClick(CompetitionStatus.DRAFT)}>
						<ModeEditIcon />&nbsp;
						{PageStrings.Actions.ToDraft}
					</Button></>
			}

			{
				competition.status === CompetitionStatus.CLOSED &&
				<Button
					title={PageStrings.Actions.Reopen}
					variant="contained"
					color="success"
					onClick={() => onButtonClick(CompetitionStatus.OPEN)}>
					<RestartAltIcon />&nbsp;
					{PageStrings.Actions.Reopen}
				</Button>
			}
		</div>

		<ConfirmationDialog
			isOpen={confirmationDialogOpen}
			title={STRINGS.Dialogs.UpdateStatus.Title(competition.title, newStatus!)}
			cancelBtnLabel={STRINGS.Cancel}
			confirmBtnLabel={STRINGS.Confirm}
			isLoading={updateStatusIsPending}
			error={errorMessageStr}
			content={STRINGS.Dialogs.UpdateStatus.Content}
			onCancel={() => { setConfirmationDialogOpen(false) }}
			onClose={() => { setConfirmationDialogOpen(false) }}
			onConfirm={() => onUpdateHandler()} />
	</div>;
}