import classNames from "../../App.module.scss";
import { useResults } from "../../queries/competitions.queries";
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
		<Results competitors={response.value.competitors} problemsGroups={response.value.problemsGroups} />
	</div >
}