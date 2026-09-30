import { ErrorMessage } from "../../../../../components/ErrorMessage";
import { CompetitionForm } from "../../../../../components/forms/CompetitionForm";
import { Spinner } from "../../../../../components/Spinner";
import { useCompetitionById } from "../../../../../queries/competitions.queries";

interface IManageCompetitionProps {
	competitionId: string;
}

export function ManageCompetition(props: IManageCompetitionProps) {
	const { competitionId } = props;
	const { data: response, isLoading, error } = useCompetitionById(competitionId);

	if (isLoading) {
		return <Spinner />;
	}

	if (error || !response || response?.isFailure || !response?.value) {
		return <ErrorMessage errorCode={response?.error?.code ?? ''} />
	}

	return <CompetitionForm competition={response.value} />;
}