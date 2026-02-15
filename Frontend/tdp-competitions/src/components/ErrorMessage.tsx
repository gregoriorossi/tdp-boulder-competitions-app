import { ERROR_STRINGS, STRINGS } from "../consts/strings.consts";

interface IErrorMessageProps {
	errorCode: string;
}

export function ErrorMessage(props: IErrorMessageProps) {
	const message: string = ERROR_STRINGS[props.errorCode] ?? STRINGS.GenericError;
	return <span>
		{message}
	</span>;
}