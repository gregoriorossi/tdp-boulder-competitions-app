import { useState } from "react";
import { Problem } from "./Problem";
import AddIcon from '@mui/icons-material/Add';
import classNames from "../../../../../App.module.scss";
import { STRINGS } from "../../../../../consts/strings.consts";
import type { IProblemsGroup } from "../../../../../models/competitions.models";
import { getBorderColor, getTextColor } from "../../../../../utils/problems.utils";
import { NewProblemModal } from "./modals/NewProblemModal";
import { sortProblemsFn } from "../../../../../utils/competitions.utils";

interface IProblemGroupProps {
	group: IProblemsGroup;
}

export function ProblemGroup(props: IProblemGroupProps) {
	const { group } = props;
	const [isAddProblemModalOpen, setIsAddProblemModalOpen] = useState<boolean>(false);
	const borderColor = getBorderColor(group.colorCode);
	const textColor = getTextColor(group.colorCode);

	return <div className={classNames.group}>
		<div className={classNames.colorMarkerContainer}>
			<div className={classNames.colorMarker}
				title={STRINGS.Add}
				onClick={() => setIsAddProblemModalOpen(true)}
				style={{ backgroundColor: group.colorCode, borderColor: borderColor }}>
				<AddIcon className={classNames.addIcon} style={{ color: textColor }} />
			</div>
		</div>
		

		{
			group.problems
				.sort(sortProblemsFn)
				.map((p) =>
					<Problem
						problem={p}
						color={group.colorCode}
						key={p.id} />)
		}

		<NewProblemModal
			open={isAddProblemModalOpen}
			problemsGroupId={group.id!}
			competitionId={group.competitionId}
			onClose={() => setIsAddProblemModalOpen(false)}
			onAdded={() => setIsAddProblemModalOpen(false)} />
	</div>
}