import { Alert } from "@mui/material";
import { ERROR_STRINGS, STRINGS } from "../consts/strings.consts";

interface IErrorMessageProps {
	errorCode: string;
}

export function ErrorMessage(props: IErrorMessageProps) {
	const message: string = ERROR_STRINGS[props.errorCode] ?? STRINGS.GenericError;
	return <Alert severity="error">
		{message}
	</Alert>;
}