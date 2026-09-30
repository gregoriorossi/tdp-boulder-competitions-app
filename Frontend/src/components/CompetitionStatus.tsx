import Chip from "@mui/material/Chip";
import { CompetitionStatus } from "../models/competitions.models";
import { STRINGS } from "../consts/strings.consts";


interface IStatusProps {
	status?: CompetitionStatus;
}

export function Status(props: IStatusProps) {

	if (props.status === CompetitionStatus.CLOSED)
		return <Chip label={STRINGS.CompetitionStatus.Closed} color="error" />;

	if (props.status === CompetitionStatus.OPEN)
		return <Chip label={STRINGS.CompetitionStatus.Open} color="success" />;

	if (props.status === CompetitionStatus.DRAFT)
		return <Chip label={STRINGS.CompetitionStatus.Draft} color="warning" />;
	return null;

}