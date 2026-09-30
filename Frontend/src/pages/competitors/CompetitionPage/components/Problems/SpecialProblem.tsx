import { Alert, Checkbox, Snackbar } from "@mui/material";
import classNames from "../../../../../App.module.scss";
import type { ISendSpecialProblemResponse, ISpecialProblem } from "../../../../../models/competitors.api.models";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useSendSpecialProblem, useUnsendSpecialProblem } from "../../../../../queries/competitors.queries";
import { useState } from "react";
import { ErrorMessage } from "../../../../../components/ErrorMessage";
import { Spinner } from "../../../../../components/Spinner";

interface ISpecialProblemProps {
	specialProblem: ISpecialProblem;
	disableSending: boolean;
	competitorId: string;
	sent: ISendSpecialProblemResponse | undefined;
}

interface ISnackbarProps {
	open: boolean;
	messageCode: string;
}

export function SpecialProblem(props: ISpecialProblemProps) {
	const { specialProblem: problem, competitorId, disableSending, sent } = props;
	const { mutateAsync: sendSpecialProblemAsync, isPending: sendSpecialProblemIsPending } = useSendSpecialProblem(problem.competitionId, competitorId);
	const { mutateAsync: unsendSpecialProblemAsync, isPending: unsendSpecialProblemIsPending } = useUnsendSpecialProblem(problem.competitionId, competitorId);

	const [snackbarOpen, setSnackbarOpen] = useState<ISnackbarProps>({ open: false, messageCode: '' });
	const handleCloseSnackbar = () => {
		setSnackbarOpen({ open: false, messageCode: '' });
	};

	const onSpecialProblemSent = async (competitorId: string): Promise<void> => {
		try {
			const data = await sendSpecialProblemAsync({
				competitionId: problem.competitionId,
				competitorId,
				specialProblemId: problem.id!
			});
			if (data.isFailure) {
				setSnackbarOpen({ open: true, messageCode: data.error?.code ?? '' });
			}
		} catch {
			setSnackbarOpen({ open: true, messageCode: '' });
		}
	}

	const onSpecialProblemUnsent = async (): Promise<void> => {
		if (!sent) {
			return;
		}

		try {

			const data = await unsendSpecialProblemAsync({
				competitionId: problem.competitionId,
				sentSpecialProblemId: sent.id
			});
			if (data.isFailure) {
				setSnackbarOpen({ open: true, messageCode: data.error?.code ?? '' });
			}

		} catch {
			setSnackbarOpen({ open: true, messageCode: '' });
		}
	}

	return <div className={classNames.specialProblem}>

		<EmojiEventsIcon />&nbsp;
		{problem.name}

		<Checkbox
			checked={!!sent}
			disabled={disableSending}
			onChange={async (_event, checked: boolean) => {
				if (!checked) {
					await onSpecialProblemUnsent();
				} else {
					await onSpecialProblemSent(competitorId);
				}
			}} />

		<Snackbar
			open={snackbarOpen.open}
			autoHideDuration={5000}
			onClose={handleCloseSnackbar}
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
			<Alert onClose={handleCloseSnackbar} severity="error" icon={false}>
				<ErrorMessage errorCode={snackbarOpen.messageCode} />
			</Alert>
		</Snackbar>

		{
			(sendSpecialProblemIsPending || unsendSpecialProblemIsPending) &&
			<Spinner backdrop={true} />
		}
	</div>;
}