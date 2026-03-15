import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export interface IConfirmationDialogProps {
	title: string;
	content: string;
	isOpen: boolean;
	onClose: () => void;
	onCancel: () => void;
	onConfirm: () => void;
	cancelBtnLabel: string;
	confirmBtnLabel: string;
}

export default function ConfirmationDialog(props: IConfirmationDialogProps) {
	const { isOpen, title, content, onConfirm, onCancel, cancelBtnLabel, confirmBtnLabel } = props;

	return (
		<Dialog open={isOpen} onClose={onCancel}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				{content}
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={onCancel}>{cancelBtnLabel}</Button>
				<Button variant="contained" onClick={onConfirm}>{confirmBtnLabel}</Button>
			</DialogActions>
		</Dialog>
	);
}