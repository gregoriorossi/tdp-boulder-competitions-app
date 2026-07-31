import classNames from "../../App.module.scss";
import { STRINGS } from "../../consts/strings.consts";
import { useResults, useSendProblem, useUnsendProblem } from "../../queries/competitions.queries";
import { ErrorMessage } from "../ErrorMessage";
import { Spinner } from "../Spinner";
import { Results } from "./Results";
import { SpecialProblem } from "./SpecialProblem";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

interface IManageResultsProps {
	competitionId: string;
}

export function ManageResults(props: IManageResultsProps) {
	const { competitionId } = props;

	const { data: response, isLoading: isGetResultsLoading, error } = useResults(competitionId);
	const { mutateAsync: unsendProblemAsync } = useUnsendProblem(competitionId);
	const { mutateAsync: sendProblemAsync } = useSendProblem(competitionId);

	const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};

	const onProblemSent = async (competitorId: string, problemId: string): Promise<void> => {
		try {
			await sendProblemAsync({
				competitionId,
				competitorId,
				problemId
			});
		} catch {
			setSnackbarOpen(true);
		}
	}

	const onProblemUnsent = async (problemId: string, sentProblemId: string): Promise<void> => {
		try {
			await unsendProblemAsync({
				competitionId,
				problemId,
				sentProblemId
			});
		} catch {
			setSnackbarOpen(true);
		}
	}

	if (isGetResultsLoading) {
		return <Spinner />;
	}

	if (error || response?.isFailure || !response?.value) {
		return <ErrorMessage errorCode={response?.error?.code ?? ''} />
	}

	return <div className={classNames.manageResults}>
		<div className={classNames.specialProblems}>
			{
				response.value.specialProblems
					.map(sp => <SpecialProblem specialProblem={sp} key={sp.id} />)
			}
		</div>
		<Results
			competitors={response.value.competitors}
			problemsGroups={response.value.problemsGroups}
			onProblemUnsent={onProblemUnsent}
			onProblemSent={onProblemSent} />

		{
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={5000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
				<Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
					{STRINGS.Errors.Generic}
				</Alert>
			</Snackbar>
		}

	</div >
}