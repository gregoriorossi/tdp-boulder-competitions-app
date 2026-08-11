import { Button, ButtonGroup } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import ConfirmationDialog from "../../../../../components/ConfirmationDialog";
import { Errors } from "../../../../../consts/errors.consts";
import { STRINGS } from "../../../../../consts/strings.consts";
import type { ICompetitor } from "../../../../../models/competitions.models";
import { useDeleteMinor } from "../../../../../queries/registrations.queries";
import { buildFullName } from "../../../../../utils/competitions.utils";
import { DateUtils } from "../../../../../utils/date.utils";
import classNames from "../../../../../App.module.scss";
import { MinorModal } from "../../../../../components/modals/MinorModal";

interface IMinorsRowProps {
	competitor: ICompetitor;
}

export function MinorRow(props: IMinorsRowProps) {
	const { competitor } = props;
	const [deleteMinorDialogOpen, setDeleteMinorDialogOpen] = React.useState<boolean>(false);
	const [isAddMinorModalOpen, setIsAddMinorModalOpen] = React.useState<boolean>(false);
	const { error: deleteError, mutateAsync: deleteMinorAsync, isPending: isDeletePending }
		= useDeleteMinor(competitor.competitionId, competitor.registrationId);
	const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

	const fullName: string = buildFullName(competitor);

	const onDeleteMinorHandler = async (): Promise<void> => {
		try {
			const data = await deleteMinorAsync(competitor.id);
			if (data.isSuccess) {
				setErrorMessage(null);
				setDeleteMinorDialogOpen(false);
				return;
			}
			setErrorMessage(data.error?.code ?? Errors.Generic);
		} catch (e) {
			console.log(e);
			setErrorMessage(Errors.Generic);
		}
	}

	const errorMessageStr: string | null = errorMessage ?? (deleteError ? Errors.Generic : null);

	return <>
		<div className={classNames.minorRow}>
			<div>
				<ButtonGroup variant="contained">
					<Button title={STRINGS.Details} onClick={() => setIsAddMinorModalOpen(true)}>
						<CreateIcon />
					</Button>
					<Button title={STRINGS.Delete} onClick={() => setDeleteMinorDialogOpen(true)}>
						<DeleteIcon />
					</Button>
				</ButtonGroup>
			</div>
			<div>{fullName}</div>
			<div>{DateUtils.ToDateOnly(competitor.birthDate)}</div>
		</div>

		<ConfirmationDialog
			isOpen={deleteMinorDialogOpen}
			title={STRINGS.Dialogs.DeleteCompetitor.Title(fullName)}
			cancelBtnLabel={STRINGS.Cancel}
			confirmBtnLabel={STRINGS.Delete}
			isLoading={isDeletePending}
			error={errorMessageStr}
			content={STRINGS.Dialogs.DeleteCompetitor.Content}
			onCancel={() => { setDeleteMinorDialogOpen(false) }}
			onClose={() => { setDeleteMinorDialogOpen(false) }}
			onConfirm={onDeleteMinorHandler} />

		<MinorModal
			open={isAddMinorModalOpen}
			onChange={() => { setIsAddMinorModalOpen(false); }}
			competitionId={competitor.competitionId}
			registrationId={competitor.registrationId}
			minor={competitor}
			onClose={() => setIsAddMinorModalOpen(false)} />
	</>;
}