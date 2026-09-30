import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Spinner } from "./Spinner";
import { ErrorMessage } from "./ErrorMessage";

export interface IConfirmationDialogProps {
	title: string;
	content: string;
	isOpen: boolean;
	onClose: () => void;
	onCancel: () => void;
	onConfirm: () => void;
	error: string | null;
	isLoading: boolean;
	cancelBtnLabel: string;
	confirmBtnLabel: string;
}

export default function ConfirmationDialog(props: IConfirmationDialogProps) {
	const { isOpen, title, content, onConfirm, onCancel, cancelBtnLabel, confirmBtnLabel, isLoading, error } = props;

	return (
		<Dialog open={isOpen} onClose={onCancel}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				{content}
				{
					isLoading && <Spinner />
				}
				{
					(error && error.length > 0) && <ErrorMessage errorCode={error ?? ""} />
				}
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={onCancel}>{cancelBtnLabel}</Button>
				<Button variant="contained" onClick={onConfirm}>{confirmBtnLabel}</Button>
			</DialogActions>
		</Dialog>
	);
}