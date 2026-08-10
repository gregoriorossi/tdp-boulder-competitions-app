import { TableCell, TableRow } from "@mui/material";
import type { IRanking } from "../../models/competitions.models";

interface IRankingProps {
	ranking: IRanking;
	className: string;
}

export function Ranking(props: IRankingProps) {
	const { ranking, className } = props;
	return <TableRow key={`${ranking.position}-${ranking.lastName}`} className={className}>
		<TableCell>
			{ranking.position}
		</TableCell>
		<TableCell>
			{ranking.score}
		</TableCell>
		<TableCell>
			{ranking.lastName}
		</TableCell>
		<TableCell>
			{ranking.firstName}
		</TableCell>
	</TableRow>;
}