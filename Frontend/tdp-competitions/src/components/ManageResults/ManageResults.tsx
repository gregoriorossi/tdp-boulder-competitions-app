import classNames from "../../App.module.scss";
import { useResults, useSendProblem, useUnsendProblem } from "../../queries/competitions.queries";
import { ErrorMessage } from "../ErrorMessage";
import { Spinner } from "../Spinner";
import { Results } from "./Results";
import { SpecialProblem } from "./SpecialProblem";

interface IManageResultsProps {
	competitionId: string;
}

export function ManageResults(props: IManageResultsProps) {
	const { competitionId } = props;

	const { data: response, isLoading: isGetResultsLoading, error } = useResults(competitionId);
	const { mutateAsync: unsendProblemAsync, error: unsendProblemError } = useUnsendProblem(competitionId);
	const { mutateAsync: sendProblemAsync, error: sendProblemError } = useSendProblem(competitionId);

	const onProblemSent = async (competitorId: string, problemId: string): Promise<void> => {
		await sendProblemAsync({
			competitionId,
			competitorId,
			problemId
		});
	}

	const onProblemUnsent = async (sentProblemId: string): Promise<void> => {
		await unsendProblemAsync(sentProblemId);
	}

	if (isGetResultsLoading) {
		return <Spinner />;
	}

	if (error || response?.isFailure || !response?.value) {
		return <ErrorMessage errorCode={response?.error?.code ?? ''} />
	}

	return <div className={classNames.manageResults}>
		<div className={classNames.specialProblems}>
			{
				response.value.specialProblems
					.map(sp => <SpecialProblem specialProblem={sp} key={sp.id} />)
			}
		</div>
		<Results
			competitors={response.value.competitors}
			problemsGroups={response.value.problemsGroups}
			onProblemUnsent={onProblemUnsent}
			onProblemSent={onProblemSent} />
	</div >
}