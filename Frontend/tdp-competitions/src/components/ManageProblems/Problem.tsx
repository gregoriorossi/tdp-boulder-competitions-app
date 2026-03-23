import { useState } from "react";
import classNames from "../../App.module.scss";
import type { IProblem } from "../../models/competitions.models";
import { getBorderColor, getTextColor } from "../../utils/problems.utils";
import { ProblemFormModal } from "../modals/ProblemFormModal";

interface IProblemProps {
	problem: IProblem;
	color: string;
}

export function Problem(props: IProblemProps) {
	const { problem, color } = props;
	const textColor = getTextColor(color);
	const borderColor = getBorderColor(color);
	const [isProblemModalOpen, setIsProblemModalOpen] = useState<boolean>(false);


	return <>
		<div className={classNames.problem}
			onClick={() => { setIsProblemModalOpen(true) }}
			style={{ backgroundColor: color, color: textColor, borderColor: borderColor }}>
			{problem.name}
		</div>

		<ProblemFormModal
			open={isProblemModalOpen}
			problem={problem}
			onUpdate={() => setIsProblemModalOpen(false)}
			onClose={() => setIsProblemModalOpen(false)} />
	</>;
}