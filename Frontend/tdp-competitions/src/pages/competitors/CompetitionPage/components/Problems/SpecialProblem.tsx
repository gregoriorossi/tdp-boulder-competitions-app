import { Checkbox } from "@mui/material";
import classNames from "../../../../../App.module.scss";
import type { ISendSpecialProblemResponse, ISpecialProblem } from "../../../../../models/competitors.api.models";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useSendSpecialProblem, useUnsendSpecialProblem } from "../../../../../queries/competitors.queries";

interface ISpecialProblemProps {
	specialProblem: ISpecialProblem;
	disableSending: boolean;
	competitorId: string;
	sent: ISendSpecialProblemResponse | undefined;
}

export function SpecialProblem(props: ISpecialProblemProps) {
	const { specialProblem: problem, competitorId, disableSending, sent } = props;
	const { mutateAsync: sendSpecialProblemAsync } = useSendSpecialProblem(problem.competitionId, competitorId);
	const { mutateAsync: unsendSpecialProblemAsync } = useUnsendSpecialProblem(problem.competitionId, competitorId);
	console.log("special problem", problem, sent);
	const onSpecialProblemSent = async (competitorId: string): Promise<void> => {
		try {
			await sendSpecialProblemAsync({
				competitionId: problem.competitionId,
				competitorId,
				specialProblemId: problem.id!
			});
		} catch {
			//setSnackbarOpen(true);
		}
	}

	const onSpecialProblemUnsent = async (): Promise<void> => {
		try {
			if (sent) {
				await unsendSpecialProblemAsync({
					competitionId: problem.competitionId,
					sentSpecialProblemId: sent.id
				});
			}

		} catch {
			//setSnackbarOpen(true);
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
			}}

		/>
	</div>;
}