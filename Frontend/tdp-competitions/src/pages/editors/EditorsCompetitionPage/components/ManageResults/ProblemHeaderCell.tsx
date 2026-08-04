import classNames from "../../../../../App.module.scss";
import { getBorderColor, getTextColor } from "../../../../../utils/problems.utils";
import { TableCell } from "@mui/material";

interface IProblemCellProps {
	colorCode: string;
	name: string;
}

export function ProblemHeaderCell(props: IProblemCellProps) {
	const { colorCode, name } = props;

	const textColor = getTextColor(colorCode);
	const borderColor = getBorderColor(colorCode);

	return <TableCell className={classNames.problem}>
		<span style={{ backgroundColor: colorCode, borderColor: borderColor, color: textColor }}>
			{name}
		</span>
	</TableCell>;
}