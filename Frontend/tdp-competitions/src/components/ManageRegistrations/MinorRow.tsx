import { Button, ButtonGroup, TableCell, TableRow } from "@mui/material";
import { BuildFullName } from "../../utils/competitions.utils";
import { DateUtils } from "../../utils/date.utils";

import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { STRINGS } from "../../consts/strings.consts";
import type { ICompetitor } from "../../models/competitions.models";
import ConfirmationDialog from "../ConfirmationDialog";
import React from "react";
import { Errors } from "../../consts/errors.consts";
import { useDeleteCompetitor } from "../../queries/registrations.queries";

interface IMinorsRowProps {
	competitor: ICompetitor;
}

export function MinorRow(props: IMinorsRowProps) {
	const { competitor } = props;
	const [deleteCompetitorDialogOpen, setDeleteCompetitorDialogOpen] = React.useState<boolean>(false);
	const { error: deleteError, mutateAsync: deleteCompetitorAsync, isPending: isDeletePending } = useDeleteCompetitor(competitor.competitionId);
	const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

	const fullName: string = BuildFullName(competitor);

	const onDeleteCompetitorHandler = async (): Promise<void> => {
		try {
			const data = await deleteCompetitorAsync(competitor.id);
			if (data.isSuccess) { 
				setErrorMessage(null);
				setDeleteCompetitorDialogOpen(false);
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
		<TableRow>
			<TableCell>{fullName}</TableCell>
			<TableCell></TableCell>
			<TableCell>{DateUtils.ToDateOnly(competitor.birthDate)}</TableCell>
			<TableCell>
				<ButtonGroup variant="contained">
					<Button title="Dettagli"><CreateIcon /></Button>
					<Button title={STRINGS.Delete} onClick={() => setDeleteCompetitorDialogOpen(true)}>
						<DeleteIcon />
					</Button>
				</ButtonGroup>
			</TableCell>
		</TableRow>

		<ConfirmationDialog
			isOpen={deleteCompetitorDialogOpen}
			title={STRINGS.Dialogs.DeleteCompetitor.Title(fullName)}
			cancelBtnLabel={STRINGS.Cancel}
			confirmBtnLabel={STRINGS.Delete}
			isLoading={isDeletePending}
			error={errorMessageStr}
			content={STRINGS.Dialogs.DeleteCompetitor.Content}
			onCancel={() => { setDeleteCompetitorDialogOpen(false) }}
			onClose={() => { setDeleteCompetitorDialogOpen(false) }}
			onConfirm={onDeleteCompetitorHandler} />
	</>;
}