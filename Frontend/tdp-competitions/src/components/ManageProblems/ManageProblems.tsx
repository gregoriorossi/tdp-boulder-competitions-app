import classNames from "../../App.module.scss";
import { STRINGS } from "../../consts/strings.consts";
import { useProblemsByCompetitionId } from "../../queries/competitions.queries";
import { ErrorMessage } from "../ErrorMessage";
import { Spinner } from "../Spinner";
import AddIcon from '@mui/icons-material/Add';
import { SpecialProblem } from "./SpecialProblem";
import { Button } from "@mui/material";
import { SpecialProblemFormModal } from "../modals/SpecialProblemFormModal";
import { useState } from "react";
const SectionStrings = STRINGS.Pages.EditorCompetitionPage.ManageProblems;

interface IManageProblemsProps {
	competitionId: string;
}

export function ManageProblems(props: IManageProblemsProps) {

	const { data: response, isLoading: isGetProblemsLoading, error } = useProblemsByCompetitionId(props.competitionId);
	const [isSpecialProblemModalOpen, setIsSpecialProblemModalOpen] = useState<boolean>(false);

	if (isGetProblemsLoading) {
		return <Spinner />;
	}

	if (error || response?.isFailure) {
		return <ErrorMessage errorCode={response?.error?.code ?? ''} />
	}

	return <div className={classNames.manageProblems}>
		<div className={classNames.header}>
			<Button
				onClick={() => setIsSpecialProblemModalOpen(true)}
				variant="contained"
				endIcon={<AddIcon />}>
				{SectionStrings.NewSpecialProblem}
			</Button>
		</div>
		<div className={classNames.specialProblems}>
			<h3>{SectionStrings.SpecialProblems}</h3>
			<div className={classNames.problemsContainer}>
				{
					response?.value.specialProblems.map((p, idx) =>
						<SpecialProblem problem={p} key={idx} />)
				}
			</div>
		</div>
		<div className={classNames.problems}>
			<h3>{SectionStrings.Problems}</h3>
			<div>
				{
					response?.value.problemsGroups
						.sort((g1, g2) => g1.order > g2.order ? 1 : -1)
						.map((p, idx) =>
							<div key={idx}>{p.colorCode}</div>)
				}
			</div>
		</div>

		<SpecialProblemFormModal
			open={isSpecialProblemModalOpen}
			onUpdate={() => setIsSpecialProblemModalOpen(false)}
			competitionId={props.competitionId}
			onClose={() => setIsSpecialProblemModalOpen(false)} />
	</div>
}