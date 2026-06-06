import IconButton from "@mui/material/IconButton";
import type { IMinorForm } from "../../../../form-schemas/registrations.schemas";
import DeleteIcon from '@mui/icons-material/Delete';
import { STRINGS } from "../../../../consts/strings.consts";
import classNames from "../../../../App.module.scss";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import { MinorForm } from "./MinorForm";
const DeleteMinorDialogStrings = STRINGS.Pages.RegistrationPage.Dialogs.DeleteMinor;

interface IMinorProps {
	minor: IMinorForm;
	index: number;
	onDelete: (index: number) => void;
	onChange: (minor: IMinorForm, index: number) => void;
}

export function Minor(props: IMinorProps) {
	const { index, minor, onDelete, onChange } = props;
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

	return <>
		<span className={classNames.minor}>
			<span>{minor.firstName}&nbsp;{minor.lastName}</span>
			<IconButton
				onClick={() => setIsDeleteDialogOpen(true)}
				color="primary"
				title={STRINGS.Delete}>
				<DeleteIcon />
			</IconButton>
			<IconButton
				onClick={() => setIsEditModalOpen(true)}
				color="primary"
				title={STRINGS.Edit}>
				<EditIcon />
			</IconButton>
		</span>
		<ConfirmationDialog
			isOpen={isDeleteDialogOpen}
			title={DeleteMinorDialogStrings.Title(minor.firstName, minor.lastName)}
			cancelBtnLabel={STRINGS.Cancel}
			confirmBtnLabel={STRINGS.Delete}
			isLoading={false}
			error={null}
			content={DeleteMinorDialogStrings.Content}
			onCancel={() => { setIsDeleteDialogOpen(false) }}
			onClose={() => { setIsDeleteDialogOpen(false) }}
			onConfirm={() => {
				onDelete(index);
				setIsDeleteDialogOpen(false);
			}} />

		<MinorForm
			onSubmit={(editedMinor) => onChange(editedMinor, index)}
			minor={minor}
			open={isEditModalOpen}
			onClose={() => setIsEditModalOpen(false)} />
	</>;
}