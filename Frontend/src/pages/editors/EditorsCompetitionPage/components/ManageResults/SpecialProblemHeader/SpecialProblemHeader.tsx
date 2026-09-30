import { useState } from "react";
import classNames from "../../../../../../App.module.scss";
import { STRINGS } from "../../../../../../consts/strings.consts";
import type { IGetResultsSpecialProblem } from "../../../../../../models/competitions.models";
import { SpecialProblemHeaderModal } from "./SpecialProblemHeaderModal";

const ManageResultsStrings = STRINGS.Pages.EditorCompetitionPage.ManageResults;


interface ISpecialProblemProps {
	specialProblem: IGetResultsSpecialProblem;
}

export function SpecialProblemHeader(props: ISpecialProblemProps) {
	const { specialProblem } = props;
	const sentBy = specialProblem.sentBy;
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


	return <div className={classNames.specialProblem}>
		<h4>{specialProblem.name}</h4>
		<div onClick={() => setIsModalOpen(true)}>
			{
				sentBy && sentBy.length > 0
					? <>
						{ManageResultsStrings.SentBy(sentBy[0])}<br />
						{ManageResultsStrings.SentAt(sentBy[0]) }
					</>
					: ManageResultsStrings.NotSent
			}
		</div>

		<SpecialProblemHeaderModal
			specialProblem={specialProblem}
			open={isModalOpen}
			onClose={() => setIsModalOpen(false)} />
	</div>
}