import { useCompetitionById } from "../../queries/competitions.queries";
import { ErrorMessage } from "../ErrorMessage";
import { Spinner } from "../Spinner";
import { CompetitionForm } from "../forms/CompetitionForm";

interface IManageCompetitionProps {
	competitionId: string;
}

export function ManageCompetition(props: IManageCompetitionProps) {
	const { competitionId } = props;
	const { data: response, isLoading, error } = useCompetitionById(competitionId);

	if (isLoading) {
		return <Spinner />;
	}

	if (error || !response || response?.isFailure) {
		return <ErrorMessage errorCode={response?.error?.code ?? ''} />
	}

	return <CompetitionForm competition={response.value} />;
}