import { IconButton } from "@mui/material";
import classNames from "../../App.module.scss";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import type { ISpecialProblem } from "../../models/competitions.models"
import { STRINGS } from "../../consts/strings.consts";
import { useState } from "react";
import { useDeleteSpecialProblem } from "../../queries/competitions.queries";
import ConfirmationDialog from "../ConfirmationDialog";
import { Errors } from "../../consts/errors.consts";
import { SpecialProblemFormModal } from "../modals/SpecialProblemFormModal";

interface ISpecialProblemProps {
	problem: ISpecialProblem;
}

export function SpecialProblem(props: ISpecialProblemProps) {
	const { problem } = props;
	const [deleteFormDialogOpen, setDeleteFormDialogOpen] = useState<boolean>(false);
	const [isProblemModalOpen, setIsProblemModalOpen] = useState<boolean>(false);

	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const { error: deleteError, isPending: deleteIsPending, mutateAsync: deleteMutateAsync } = useDeleteSpecialProblem(problem.competitionId);

	const onDeleteHandler = async (problem: ISpecialProblem) => {
		try {
			const data = await deleteMutateAsync(problem);
			if (data.isSuccess) {
				setDeleteFormDialogOpen(false);
				setErrorMessage(null);
				return;
			}
			setErrorMessage(data.error?.code ?? null);
		} catch (e) {
			console.log(e);
			setErrorMessage(Errors.Generic);
		}
	}

	const errorMessageStr: string | null = errorMessage ?? (deleteError ? Errors.Generic : null);

	return <div className={classNames.specialProblem}>
		{props.problem.name}&nbsp;
		<IconButton
			onClick={() => setIsProblemModalOpen(true)}
			color="primary"
			title={STRINGS.Edit}>
			<CreateIcon />
		</IconButton>
		<IconButton
			onClick={() => { setDeleteFormDialogOpen(true); }}
			color="primary"
			title={STRINGS.Delete}>
			<DeleteIcon />
		</IconButton>

		<ConfirmationDialog
			isOpen={deleteFormDialogOpen}
			title={STRINGS.Dialogs.DeleteSpecialProblem.Title(problem.name)}
			cancelBtnLabel={STRINGS.Cancel}
			confirmBtnLabel={STRINGS.Delete}
			isLoading={deleteIsPending}
			error={errorMessageStr}
			content={STRINGS.Dialogs.DeleteSpecialProblem.Content}
			onCancel={() => { setDeleteFormDialogOpen(false) }}
			onClose={() => { setDeleteFormDialogOpen(false) }}
			onConfirm={() => onDeleteHandler(props.problem)} />

		<SpecialProblemFormModal
			open={isProblemModalOpen}
			specialProblem={problem}
			onUpdate={() => setIsProblemModalOpen(false)}
			competitionId={problem.competitionId}
			onClose={() => setIsProblemModalOpen(false)} />
	</div>
}