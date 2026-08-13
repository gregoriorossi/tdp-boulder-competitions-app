import classNames from "../../../../../App.module.scss";
import type { ISendSpecialProblemResponse, ISpecialProblem } from "../../../../../models/competitors.api.models";
import { SpecialProblem } from "./SpecialProblem";

interface ISpecialProblemsProps {
	specialProblems: ISpecialProblem[];
	disableSending: boolean;
	competitorId: string;
	sent: ISendSpecialProblemResponse[];
}

export function SpecialProblems(props: ISpecialProblemsProps) {
	const { specialProblems, competitorId, disableSending, sent } = props;
	return <div className={classNames.specialProblems}>
		{
			specialProblems.map(problem => <SpecialProblem
				key={`special-problem-${problem.id}`}
				competitorId={competitorId}	
				disableSending={disableSending}
				sent={sent.find(s => s.specialProblemId === problem.id)}
				specialProblem={problem} />)
		}
	</div>;
}