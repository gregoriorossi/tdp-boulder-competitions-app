import { Box, Button, ButtonGroup, Collapse, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import type { IRegistration } from "../../models/competitions.models";
import { BuildFullName } from "../../utils/competitions.utils";
import { DateUtils } from "../../utils/date.utils";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Articlecon from '@mui/icons-material/Article';
import { STRINGS } from "../../consts/strings.consts";
import { MinorRow } from "./MinorRow";
import classNames from "../../App.module.scss";
import React from "react";
import ConfirmationDialog from "../ConfirmationDialog";
import { Errors } from "../../consts/errors.consts";
import { useDeleteRegistration } from "../../queries/registrations.queries";

interface IRegistrationRowProps {
	registration: IRegistration;
}

export function RegistrationRow(props: IRegistrationRowProps) {
	const { registration } = props;
	const [isOpen, setIsOpen] = useState<boolean>(true);
	const [deleteRegistrationDialogOpen, setDeleteRegistrationDialogOpen] = React.useState<boolean>(false);
	const { error: deleteError, mutateAsync: deleteRegistrationAsync, isPending: isDeletePending } = useDeleteRegistration(registration.competitionId);
	const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

	const fullName: string = BuildFullName(registration.competitor);
	const hasMinors: boolean = registration.minors.length > 0;

	const onDeleteRegistrationHandler = async (): Promise<void> => {
		try {
			const data = await deleteRegistrationAsync(registration.id);
			if (data.isSuccess) {
				setErrorMessage(null);
				setDeleteRegistrationDialogOpen(false);
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
		<TableRow className={`${classNames.registrationRow} ${hasMinors ? classNames.hasMinors : ''}`}
			onClick={() => setIsOpen(!isOpen)}>
			<TableCell>{fullName}</TableCell>
			<TableCell>{registration.email}</TableCell>
			<TableCell>{DateUtils.ToDateOnly(registration.competitor.birthDate)}</TableCell>
			<TableCell>{hasMinors ? registration.minors.length : "No"}</TableCell>
			<TableCell>
				<ButtonGroup variant="contained">
					<Button title={STRINGS.Details}><CreateIcon /></Button>
					<Button title={STRINGS.Delete} onClick={(e) => { e.stopPropagation(); setDeleteRegistrationDialogOpen(true); }}>
						<DeleteIcon />
					</Button>
					<Button title={STRINGS.Details}><Articlecon /></Button>
				</ButtonGroup>
			</TableCell>
		</TableRow>

		{
			hasMinors &&
			<Collapse in={isOpen} unmountOnExit>
				<TableRow>
					<TableCell>
						<Box>
							{
								registration.minors
									.map((m, idx) => <MinorRow
										competitor={m}
										key={`${idx}-${m.lastName}-${m.firstName}`} />)
							}
						</Box>
					</TableCell>
				</TableRow>
			</Collapse>
		}

		<ConfirmationDialog
			isOpen={deleteRegistrationDialogOpen}
			title={STRINGS.Dialogs.DeleteRegistration.Title(registration.email)}
			cancelBtnLabel={STRINGS.Cancel}
			confirmBtnLabel={STRINGS.Delete}
			isLoading={isDeletePending}
			error={errorMessageStr}
			content={STRINGS.Dialogs.DeleteRegistration.Content}
			onCancel={() => { setDeleteRegistrationDialogOpen(false) }}
			onClose={() => { setDeleteRegistrationDialogOpen(false) }}
			onConfirm={onDeleteRegistrationHandler} />
	</>;
}