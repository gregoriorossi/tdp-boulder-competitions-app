import classNames from "../../../../../App.module.scss";
import { getBorderColor, getTextColor } from "../../../../../utils/problems.utils";
import { TableCell } from "@mui/material";

interface IProblemCellProps {
	colorCode: string;
	name: string;
	score?: number | undefined;
}

export function ProblemHeaderCell(props: IProblemCellProps) {
	const { colorCode, name, score } = props;

	const textColor = getTextColor(colorCode);
	const borderColor = getBorderColor(colorCode);

	return <TableCell className={classNames.problem} style={{ backgroundColor: colorCode, borderColor: borderColor, color: textColor }}>
		<span >
			{name}<br />
			{score !== undefined ? `(${score}pt)` : ''}
		</span>
	</TableCell>;
}