import classNames from "../../App.module.scss";
import { STRINGS } from "../../consts/strings.consts";
import type { IGetResultsSpecialProblem } from "../../models/competitions.models";
const ManageResultsStrings = STRINGS.Pages.EditorCompetitionPage.ManageResults;


interface ISpecialProblemProps {
	specialProblem: IGetResultsSpecialProblem;
}

export function SpecialProblem(props: ISpecialProblemProps) {
	const { specialProblem } = props;
	const firstSentBy = specialProblem.firstSentBy;

	return <div className={classNames.specialProblem}>
		<h4>{specialProblem.name}</h4>
		<div>
			{
				firstSentBy
					? <>
						{ManageResultsStrings.SentBy(firstSentBy)}<br />
						{ManageResultsStrings.SentAt(firstSentBy) }
					</>
					: ManageResultsStrings.NotSent
			}
		</div>
	</div>
}