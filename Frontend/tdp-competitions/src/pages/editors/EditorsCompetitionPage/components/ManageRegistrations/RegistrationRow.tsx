import { Box, Button, ButtonGroup, Collapse } from "@mui/material";
import { useState } from "react";
import PrintIcon from '@mui/icons-material/Print';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { MinorRow } from "./MinorRow";
import React from "react";
import { EditorsEndpoints } from "../../../../../api/endpoints";
import ConfirmationDialog from "../../../../../components/ConfirmationDialog";
import { RegistrationModal } from "../../../../../components/modals/RegistrationModal";
import { Errors } from "../../../../../consts/errors.consts";
import { STRINGS } from "../../../../../consts/strings.consts";
import type { IRegistration } from "../../../../../models/competitions.models";
import { useDeleteRegistration } from "../../../../../queries/registrations.queries";
import { BuildFullName } from "../../../../../utils/competitions.utils";
import { DateUtils } from "../../../../../utils/date.utils";
import classNames from "../../../../../App.module.scss";
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import { MinorModal } from "../../../../../components/modals/MinorModal";
const RegistrationRowStrings = STRINGS.Pages.EditorCompetitionPage.ManageRegistrations.Table.RegistrationRow;

interface IRegistrationRowProps {
	registration: IRegistration;
}

export function RegistrationRow(props: IRegistrationRowProps) {
	const { registration } = props;
	const [isOpen, setIsOpen] = useState<boolean>(true);
	const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState<boolean>(false);
	const [isAddMinorModalOpen, setIsAddMinorModalOpen] = useState<boolean>(false);
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
		<div className={`${classNames.row} ${hasMinors ? classNames.hasMinors : ''}`}
			onClick={() => setIsOpen(!isOpen)}>
			<div>{fullName}</div>
			<div>{registration.email}</div>
			<div>{DateUtils.ToDateOnly(registration.competitor.birthDate)}</div>
			<div>{hasMinors ? registration.minors.length : "No"}</div>
			<div>
				<ButtonGroup variant="contained">
					<Button title={STRINGS.Details}
						onClick={(e) => { e.stopPropagation(); setIsRegistrationModalOpen(true); }}>
						<CreateIcon />
					</Button>
					<Button title={STRINGS.Delete}
						onClick={(e) => { e.stopPropagation(); setDeleteRegistrationDialogOpen(true); }}>
						<DeleteIcon />
					</Button>
					<Button
						title={STRINGS.PrintWaiver}
						onClick={() => {
							const url: string = EditorsEndpoints.downloadWaiver(registration.competitionId, registration.id);
							window.open(url, "_blank");
						}}><PrintIcon />
					</Button>
					<Button
						title={RegistrationRowStrings.AddMinor}
						onClick={(e) => { e.stopPropagation(); setIsAddMinorModalOpen(true); }}><FamilyRestroomIcon />
					</Button>
				</ButtonGroup>
			</div>
		</div>

		{
			hasMinors &&
			<Collapse in={isOpen} unmountOnExit>
				<div>
					<div>
						<Box>
							{
								registration.minors
									.map((m) => <MinorRow
										competitor={m}
										key={`${m.id}`} />)
							}
						</Box>
					</div>
				</div>
			</Collapse>
		}

		<RegistrationModal
			open={isRegistrationModalOpen}
			onAdded={() => { }}
			onUpdated={() => { }}
			registration={registration}
			competitionId={registration.competitionId}
			onClose={() => setIsRegistrationModalOpen(false)} />

		<MinorModal
			open={isAddMinorModalOpen}
			onChange={() => { setIsAddMinorModalOpen(false); }}
			competitionId={registration.competitionId}
			registrationId={registration.id}
			onClose={() => setIsAddMinorModalOpen(false)} />

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