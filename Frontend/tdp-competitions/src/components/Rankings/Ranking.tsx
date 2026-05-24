import { TableCell, TableRow } from "@mui/material";
import type { IRanking } from "../../models/competitions.models";

interface IRankingProps {
	ranking: IRanking;
}

export function Ranking(props: IRankingProps) {
	const { ranking } = props;
	return <TableRow key={`${ranking.position}-${ranking.lastName}`}>
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