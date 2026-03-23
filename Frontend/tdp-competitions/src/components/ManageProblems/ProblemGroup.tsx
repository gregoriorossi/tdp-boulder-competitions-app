import classNames from "../../App.module.scss";
import type { IProblemsGroup } from "../../models/competitions.models";
import { Problem } from "./Problem";


interface IProblemGroupProps {
	group: IProblemsGroup;
}

export function ProblemGroup(props: IProblemGroupProps) {
	const { group } = props;

	return <div className={classNames.group}>
		{
			group.problems
				.sort((p1, p2) => p1.name > p2.name ? 1 : -1)
				.map((p) =>
					<Problem
						problem={p}
						color={group.colorCode}
						key={p.id} />)
		}
	</div>
}