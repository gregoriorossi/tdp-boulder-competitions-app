import { CopyUrlButton } from "../ManageRegistrations/CopyUrlButton";
import { CompetitionStatus, type ICompetitionInfo } from "../../models/competitions.models";
import classNames from "../../App.module.scss";
import { STRINGS } from "../../consts/strings.consts";
import { useUpdateCompetitionStatus } from "../../queries/competitions.queries";
import { useCallback, useMemo, useState } from "react";
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

type ActionConfig = {
	toStatus: CompetitionStatus;
	title: string;
	color: "success" | "error" | "warning";
	icon: React.ReactNode;
	label: string;
};

export function ActionsContainer(props: IActionsContainerProps) {
	const { competition } = props;

	const { error, mutateAsync, isPending } = useUpdateCompetitionStatus(competition.id);

	const [dialog, setDialog] = useState<{
		open: boolean;
		newStatus: CompetitionStatus | null;
	}>({ open: false, newStatus: null });



	const openDialog = useCallback((newStatus: CompetitionStatus) => {
		setDialog({ open: true, newStatus });
	}, []);

	const closeDialog = useCallback(() => {
		setDialog({ open: false, newStatus: null });
	}, []);

	const actionsByStatus: Record<CompetitionStatus, ActionConfig[]> = useMemo(
		() => ({
			[CompetitionStatus.DRAFT]: [
				{
					toStatus: CompetitionStatus.OPEN,
					title: PageStrings.Actions.Start,
					color: "success",
					icon: <PlayCircleFilledWhiteIcon />,
					label: PageStrings.Actions.Start,
				},
			],
			[CompetitionStatus.OPEN]: [
				{
					toStatus: CompetitionStatus.CLOSED,
					title: PageStrings.Actions.Close,
					color: "error",
					icon: <StopCircleIcon />,
					label: PageStrings.Actions.Close,
				},
				{
					toStatus: CompetitionStatus.DRAFT,
					title: PageStrings.Actions.ToDraft,
					color: "warning",
					icon: <ModeEditIcon />,
					label: PageStrings.Actions.ToDraft,
				},
			],
			[CompetitionStatus.CLOSED]: [
				{
					toStatus: CompetitionStatus.OPEN,
					title: PageStrings.Actions.Reopen,
					color: "success",
					icon: <RestartAltIcon />,
					label: PageStrings.Actions.Reopen,
				},
			],
		}),
		[]
	);

	const currentActions = actionsByStatus[competition.status] ?? [];

	const onConfirm = useCallback(async () => {
		if (dialog.newStatus === null) return;

		await mutateAsync({
			competitionId: competition.id,
			status: dialog.newStatus,
		});

		closeDialog();
	}, [dialog.newStatus, mutateAsync, competition.id, closeDialog]);

	const errorMessageStr: string | null = error ? Errors.Generic : null;

	const dialogTitle = dialog.newStatus !== null
			? STRINGS.Dialogs.UpdateStatus.Title(competition.title, dialog.newStatus)
			: "";

	return <div className={classNames.actionsContainer}>
		<CopyUrlButton competitionSlug={competition.slug} />

		<div>
			{currentActions.map((a, idx) => (
				<Button
					key={`${a.toStatus}-${idx}`}
					title={a.title}
					variant="contained"
					color={a.color}
					onClick={() => openDialog(a.toStatus)}
					sx={{ mr: 1 }}>
					{a.icon}&nbsp;{a.label}
				</Button>
			))}
		</div>

		<ConfirmationDialog
			isOpen={dialog.open}
			title={dialogTitle}
			cancelBtnLabel={STRINGS.Cancel}
			confirmBtnLabel={STRINGS.Confirm}
			isLoading={isPending}
			error={errorMessageStr}
			content={STRINGS.Dialogs.UpdateStatus.Content}
			onCancel={closeDialog}
			onClose={closeDialog}
			onConfirm={onConfirm}
		/>
	</div>;
}