import Chip from "@mui/material/Chip";
import { CompetitionStatus } from "../../models/competitions.models";

interface IStatusProps {
	status?: CompetitionStatus;
}

export function Status(props: IStatusProps) {

	if (props.status === CompetitionStatus.CLOSED)
		return <Chip label="Chiusa" color="error" />;

	if (props.status === CompetitionStatus.OPEN)
		return <Chip label="Aperta" color="success" />;

	if (props.status === CompetitionStatus.DRAFT)
		return <Chip label="Bozza" color="warning" />;
	return null;

}