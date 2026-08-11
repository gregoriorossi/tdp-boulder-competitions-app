import { Checkbox } from "@mui/material";
import classNames from "../../../../../App.module.scss";
import type { IProblem, ISendProblemResponse } from "../../../../../models/competitors.api.models";
import { getTextColor, getBorderColor } from "../../../../../utils/problems.utils";
import { useSendProblem, useUnsendProblem } from "../../../../../queries/competitors.queries";

interface IProblemProps {
	problem: IProblem;
	competitorId: string;
	disableSending: boolean;
	color: string;
	sent: ISendProblemResponse | undefined;
}

export function Problem(props: IProblemProps) {
	const { problem, color, competitorId, disableSending, sent } = props;
	const textColor = getTextColor(color);
	const borderColor = getBorderColor(color);

	const { mutateAsync: sendProblemAsync } = useSendProblem(problem.competitionId, competitorId);
	const { mutateAsync: unsendProblemAsync } = useUnsendProblem(problem.competitionId, competitorId);

	const onProblemSent = async (competitorId: string): Promise<void> => {
		try {
			await sendProblemAsync({
				competitionId: problem.competitionId,
				competitorId,
				problemId: problem.id!
			});
		} catch {
			//setSnackbarOpen(true);
		}
	}

	const onProblemUnsent = async (): Promise<void> => {
		try {
			if (sent) {
				await unsendProblemAsync({
					competitionId: problem.competitionId,
					sentProblemId: sent.id
				});
			}
			
		} catch {
	//setSnackbarOpen(true);
		}
	}
	console.log("sent", sent);
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
			}}

		/>
	</div>;
}