import { Button, ButtonGroup, TableCell, TableRow } from "@mui/material";
import { BuildFullName } from "../../utils/competitions.utils";
import { DateUtils } from "../../utils/date.utils";

import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { STRINGS } from "../../consts/strings.consts";
import type { ICompetitor } from "../../models/competitions.models";

interface IMinorsRowProps {
	competitor: ICompetitor;
}

export function MinorRow(props: IMinorsRowProps) {
	const { competitor } = props;
	const fullName: string = BuildFullName(competitor);
	return <>
		<TableRow>
			<TableCell>{fullName}</TableCell>
			<TableCell></TableCell>
			<TableCell>{DateUtils.ToDateOnly(competitor.birthDate)}</TableCell>
			<TableCell>
				<ButtonGroup variant="contained">
					<Button title="Dettagli"><CreateIcon /></Button>
					<Button title={STRINGS.Delete}>
						<DeleteIcon />
					</Button>
				</ButtonGroup>
			</TableCell>
		</TableRow>
	</>;
}