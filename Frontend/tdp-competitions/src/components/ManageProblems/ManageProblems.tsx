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
import EditIcon from '@mui/icons-material/Edit';
import { ProblemGroup } from "./ProblemGroup";
import { EditProblemsGroupsModal } from "../modals/EditProblemsGroupsModal";
import { sortProblemsGroups } from "../../utils/problems.utils";
const SectionStrings = STRINGS.Pages.EditorCompetitionPage.ManageProblems;

interface IManageProblemsProps {
	competitionId: string;
}

export function ManageProblems(props: IManageProblemsProps) {

	const { data: response, isLoading: isGetProblemsLoading, error } = useProblemsByCompetitionId(props.competitionId);
	const [isSpecialProblemModalOpen, setIsSpecialProblemModalOpen] = useState<boolean>(false);
	const [isGroupModalOpen, setIsGroupModalOpen] = useState<boolean>(false);

	if (isGetProblemsLoading) {
		return <Spinner />;
	}

	if (error || response?.isFailure) {
		return <ErrorMessage errorCode={response?.error?.code ?? ''} />
	}

	return <div className={classNames.manageProblems}>
		<div className={classNames.header}>
			<Button
				onClick={() => setIsGroupModalOpen(true)}
				variant="contained"
				endIcon={<EditIcon />}>
				{SectionStrings.EditProblemsGroups}
			</Button>&nbsp;
			<Button
				onClick={() => setIsSpecialProblemModalOpen(true)}
				variant="contained"
				endIcon={<AddIcon />}>
				{SectionStrings.NewSpecialProblem}
			</Button>&nbsp;
			<Button
				onClick={() => setIsGroupModalOpen(true)}
				variant="contained"
				endIcon={<AddIcon />}>
				{SectionStrings.NewProblemGroup}
			</Button>
		</div>
		<div className={classNames.specialProblems}>
			<h3>{SectionStrings.SpecialProblems}</h3>
			<div className={classNames.problemsContainer}>
				{
					response?.value.specialProblems.map((p) =>
						<SpecialProblem problem={p} key={p.id} />)
				}
			</div>
		</div>
		<div className={classNames.problems}>
			<h3>{SectionStrings.Problems}</h3>
			<div>
				{
					response?.value.problemsGroups
						.sort(sortProblemsGroups)
						.map((g) =>
							<ProblemGroup key={g.id} group={g} />)
				}
			</div>
		</div>

		<EditProblemsGroupsModal
			open={isGroupModalOpen}
			competitionId={props.competitionId}
			groups={response?.value.problemsGroups ?? []}
			onClose={() => setIsGroupModalOpen(false)} />

		<SpecialProblemFormModal
			open={isSpecialProblemModalOpen}
			onUpdate={() => setIsSpecialProblemModalOpen(false)}
			competitionId={props.competitionId}
			onClose={() => setIsSpecialProblemModalOpen(false)} />
	</div>
}