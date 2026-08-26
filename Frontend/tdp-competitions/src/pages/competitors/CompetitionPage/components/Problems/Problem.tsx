import { Checkbox, Snackbar, Alert }  from "@mui/material";
import classNames from "../../../../../App.module.scss";
import type { IProblem, ISendProblemResponse } from "../../../../../models/competitors.api.models";
import { getTextColor, getBorderColor } from "../../../../../utils/problems.utils";
import { useSendProblem, useUnsendProblem } from "../../../../../queries/competitors.queries";
import { useState } from "react";
import { ErrorMessage } from "../../../../../components/ErrorMessage";
import { Spinner } from "../../../../../components/Spinner";

interface IProblemProps {
	problem: IProblem;
	competitorId: string;
	disableSending: boolean;
	color: string;
	sent: ISendProblemResponse | undefined;
}

interface ISnackbarProps {
	open: boolean;
	messageCode: string;
}

export function Problem(props: IProblemProps) {
	const { problem, color, competitorId, disableSending, sent } = props;
	const textColor = getTextColor(color);
	const borderColor = getBorderColor(color);

	const { mutateAsync: sendProblemAsync, isPending: sendProblemIsPending } = useSendProblem(problem.competitionId, competitorId);
	const { mutateAsync: unsendProblemAsync, isPending: unsendProblemIsPending } = useUnsendProblem(problem.competitionId, competitorId);

	const [snackbarOpen, setSnackbarOpen] = useState<ISnackbarProps>({ open: false, messageCode: '' });
	const handleCloseSnackbar = () => {
		setSnackbarOpen({ open: false, messageCode: '' });
	};

	const onProblemSent = async (competitorId: string): Promise<void> => {
		try {
			const data = await sendProblemAsync({
				competitionId: problem.competitionId,
				competitorId,
				problemId: problem.id!
			});

			if (data.isFailure) {
				setSnackbarOpen({ open: true, messageCode: data.error?.code ?? '' });
			}
		} catch {
			setSnackbarOpen({ open: true, messageCode: '' });
		}
	}

	const onProblemUnsent = async (): Promise<void> => {
		if (!sent) {
			return;
		}
		try {

			const data = await unsendProblemAsync({
				competitionId: problem.competitionId,
				sentProblemId: sent.id
			});

			if (data.isFailure) {
				setSnackbarOpen({ open: true, messageCode: data.error?.code ?? '' });
			}

		} catch {
			setSnackbarOpen({ open: true, messageCode: '' });
		}
	}

	return <div className={classNames.problem} >
		<div className={classNames.problemName}
			style={{ backgroundColor: color, color: textColor, borderColor: borderColor }}>
			{problem.name}
		</div>
		<Checkbox
			checked={!!sent}
			disabled={disableSending}
			onChange={async (_event, checked: boolean) => {
				if (!checked) {
					await onProblemUnsent();
				} else {
					await onProblemSent(competitorId);
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
			(sendProblemIsPending || unsendProblemIsPending) &&
				<Spinner backdrop={true} />	
		}
	</div>;
}