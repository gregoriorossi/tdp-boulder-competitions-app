import { useNavigate, useParams } from "react-router-dom";
import { EditorsPageWrapper } from "./EditorsPageWrapper";
import { Routes } from "../../consts/routes.consts";
import { useCompetitionById } from "../../queries/competitions.queries";
import { Errors } from "../../consts/errors.consts";
import type { ICompetition } from "../../models/competitions.models";
import { Spinner } from "../../components/Spinner";
import classNames from "../../App.module.scss";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { STRINGS } from "../../consts/strings.consts";
import { ErrorMessage } from "../../components/ErrorMessage";
import { ManageProblems } from "../../components/ManageProblems/ManageProblems";
const PageStrings = STRINGS.Pages.EditorCompetitionPage;

enum TabValues {
	INFO = 0,
	PROBLEMS = 1,
	REGISTRATIONS = 2,
	RANKINGS = 3
}

export function EditorsCompetitionPage() {
	const params = useParams();
	const navigate = useNavigate();
	const id: string = params.id!;
	const [tabValue, setTabValue] = useState<TabValues>(TabValues.INFO);

	const { data: response, isLoading, error } = useCompetitionById(id);

	if (response?.error && response.error.code === Errors.Competitions.NotFound) {
		navigate(Routes.NotFound);
		return;
	}

	const competition: ICompetition = response?.value as ICompetition;

	if (isLoading) {
		return <Spinner />
	}

	return <EditorsPageWrapper title={competition?.title}>
		<div className={classNames.editorsCompetitionPage}>
			<div>
				<Tabs value={tabValue}
					onChange={(_e, value) => setTabValue(value)}>
					<Tab className={classNames.tab} label={PageStrings.Tabs.Info} />
					<Tab className={classNames.tab} label={PageStrings.Tabs.Problems} />
					<Tab className={classNames.tab} label={PageStrings.Tabs.Registrations} />
					<Tab className={classNames.tab} label={PageStrings.Tabs.Rankings} />
				</Tabs>
			</div>

			{
				error && <ErrorMessage errorCode="" />
			}

			{
				tabValue === TabValues.PROBLEMS && <ManageProblems competitionId={competition.id} />
			}
		</div>
	</EditorsPageWrapper>;
}