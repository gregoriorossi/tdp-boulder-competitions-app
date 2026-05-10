import classNames from "../../App.module.scss";
import type { IResultProblem } from "./Results";
import { getBorderColor, getTextColor } from "../../utils/problems.utils";
import { TableCell } from "@mui/material";

interface IProblemCellProps {
	problem: IResultProblem;
}

export function ProblemCell(props: IProblemCellProps) {
	const { problem } = props;

	const textColor = getTextColor(problem.colorCode);
	const borderColor = getBorderColor(problem.colorCode);

	return <TableCell className={classNames.problem}>
		<span style={{ backgroundColor: problem.colorCode, borderColor: borderColor, color: textColor }}>
			{problem.name}
		</span>
	</TableCell>;
}