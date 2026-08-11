import classNames from "../../../../../App.module.scss";
import type { IProblemsGroup } from "../../../../../models/competitors.api.models";
import { sortProblemsFn } from "../../../../../utils/competitions.utils";
import { Problem } from "./Problem";

interface IProblemGroupProps {
	group: IProblemsGroup;
	competitorId: string;
	disableSending: boolean;
}

export function ProblemGroup(props: IProblemGroupProps) {
	const { group, competitorId, disableSending } = props;

	return <div className={classNames.problemGroup}>
		{
			group.problems
				.sort(sortProblemsFn)
				.map((p) =>
					<Problem
						problem={p}
						color={group.colorCode}
						competitorId={competitorId}
						disableSending={disableSending}
						key={p.id} />)
		}
	</div>
}