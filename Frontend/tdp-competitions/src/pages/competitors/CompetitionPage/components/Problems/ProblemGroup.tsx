import classNames from "../../../../../App.module.scss";
import type { IProblemsGroup, ISendProblemResponse } from "../../../../../models/competitors.api.models";
import { sortProblemsFn } from "../../../../../utils/competitions.utils";
import { Problem } from "./Problem";

interface IProblemGroupProps {
	groups: IProblemsGroup[];
	sentProblems: ISendProblemResponse[];
	competitorId: string;
	disableSending: boolean;
}

export function ProblemGroup(props: IProblemGroupProps) {
	const { groups, competitorId, disableSending, sentProblems } = props;

	return <div>
		{
			groups.map(group => (
				<div key={group.id} className={classNames.problemGroup}>
					{
						group.problems
							.sort(sortProblemsFn)
							.map((p) =>
								<Problem
									problem={p}
									color={group.colorCode}
									competitorId={competitorId}
									disableSending={disableSending}
									sent={sentProblems.find(sp => sp.problemId === p.id)}
									key={p.id} />)
					}
				</div>
			))
		}
	</div>
}