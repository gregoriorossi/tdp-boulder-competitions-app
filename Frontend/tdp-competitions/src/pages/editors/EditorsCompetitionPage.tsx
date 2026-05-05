import { useNavigate, useParams } from "react-router-dom";
import { EditorsPageWrapper } from "./EditorsPageWrapper";
import { Routes } from "../../consts/routes.consts";
import { useCompetitionById } from "../../queries/competitions.queries";
import { Errors } from "../../consts/errors.consts";
import { type ICompetitionInfo } from "../../models/competitions.models";
import { Spinner } from "../../components/Spinner";
import classNames from "../../App.module.scss";
import {  Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { STRINGS } from "../../consts/strings.consts";
import { ErrorMessage } from "../../components/ErrorMessage";
import { ManageProblems } from "../../components/ManageProblems/ManageProblems";
import { ManageRegistrations } from "../../components/ManageRegistrations/ManageRegistrations";
import { ManageCompetition } from "../../components/ManageCompetition/ManageCompetition";
import { ActionsContainer } from "../../components/ManageCompetition/ActionsContainer";
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

	const competition: ICompetitionInfo = response?.value as ICompetitionInfo;

	if (isLoading) {
		return <Spinner />
	}

	return <EditorsPageWrapper title={competition?.title} status={competition?.status }>
		<div className={classNames.editorsCompetitionPage}>
			<ActionsContainer competition={competition!} />
			<Tabs value={tabValue}
				className={classNames.tabs}
				onChange={(_e, value) => setTabValue(value)}>
				<Tab className={classNames.tab} label={PageStrings.Tabs.Info} />
				<Tab className={classNames.tab} label={PageStrings.Tabs.Problems} />
				<Tab className={classNames.tab} label={PageStrings.Tabs.Registrations} />
				<Tab className={classNames.tab} label={PageStrings.Tabs.Rankings} />
			</Tabs>

			{
				error && <ErrorMessage errorCode="" />
			}

			{
				tabValue === TabValues.INFO && <ManageCompetition competitionId={competition.id} />
			}
			{
				tabValue === TabValues.PROBLEMS && <ManageProblems competitionId={competition.id} />
			}
			{
				tabValue === TabValues.REGISTRATIONS && <ManageRegistrations competitionId={competition.id} />
			}
		</div>
	</EditorsPageWrapper>;
}