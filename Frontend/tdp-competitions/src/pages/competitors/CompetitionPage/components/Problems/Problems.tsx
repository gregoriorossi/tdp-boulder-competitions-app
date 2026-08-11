import classNames from "../../../../../App.module.scss";
import { ErrorMessage } from "../../../../../components/ErrorMessage";
import { Spinner } from "../../../../../components/Spinner";
import type { IRegistration } from "../../../../../models/competitors.models";
import { useProblemsByCompetition } from "../../../../../queries/competitors.queries";
import { ProblemGroup } from "./ProblemGroup";

interface IProblemsProps {
	competitionId: string;
	registration: IRegistration;
	disableSending: boolean;
}

export function Problems(props: IProblemsProps) {
	const { competitionId, registration, disableSending } = props;
	const { data: response, isLoading, error } = useProblemsByCompetition(competitionId);

	if (isLoading) {
		return <Spinner />;
	}

	if (error || response?.isFailure || !response?.value) {
		return <ErrorMessage errorCode={response?.error?.code ?? ''} />
	}

	return <div className={classNames.problems}>
		{
			response.value.problemsGroups.map((group) => (
				<ProblemGroup
					group={group}
					key={group.id}
					competitorId={competitorId}
					disableSending={disableSending} />
			))
		}
	</div>
}