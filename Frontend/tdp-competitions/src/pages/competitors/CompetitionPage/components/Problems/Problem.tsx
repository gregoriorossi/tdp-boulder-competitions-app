import { Checkbox } from "@mui/material";
import classNames from "../../../../../App.module.scss";
import type { IProblem } from "../../../../../models/competitors.api.models";
import { getTextColor, getBorderColor } from "../../../../../utils/problems.utils";
import { useSendProblem } from "../../../../../queries/competitors.queries";

interface IProblemProps {
	problem: IProblem;
	competitorId: string;
	disableSending: boolean;
	color: string;
	sent: boolean;
}

export function Problem(props: IProblemProps) {
	const { problem, color, competitorId, disableSending, sent } = props;
	const textColor = getTextColor(color);
	const borderColor = getBorderColor(color);

	const { mutateAsync: sendProblemAsync } = useSendProblem(problem.competitionId);
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

	return <div className={classNames.problem} >
		<div className={classNames.problemName}
			style={{ backgroundColor: color, color: textColor, borderColor: borderColor }}>
			{problem.name}
		</div>
		<Checkbox
			checked={sent}
			disabled={disableSending}
			onChange={async (_event, checked: boolean) => {
				if (!checked) {
					// const sentProblemId = c.sentProblems.find(sp => sp.problemId === p.id);
					// if (sentProblemId) {
					// 	await onProblemUnsent(p.id, sentProblemId?.id);
					// }
				} else {
					await onProblemSent(competitorId);
				}
			}}

		/>
	</div>;
}