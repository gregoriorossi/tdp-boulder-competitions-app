import { useNavigate, useParams } from "react-router-dom";
import { EditorsPageWrapper } from "../EditorsPageWrapper";
import { Routes } from "../../../consts/routes.consts";
import { useCompetitionById } from "../../../queries/competitions.queries";
import { Errors } from "../../../consts/errors.consts";
import { type ICompetitionInfo } from "../../../models/competitions.models";
import { Spinner } from "../../../components/Spinner";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { STRINGS } from "../../../consts/strings.consts";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { ManageRegistrations } from "./components/ManageRegistrations/ManageRegistrations";
import { Rankings } from "../../../components/Rankings/Rankings";
import classNames from "../../../App.module.scss";
import { ActionsContainer } from "./components/ManageCompetition/ActionsContainer";
import { ManageCompetition } from "./components/ManageCompetition/ManageCompetition";
import { ManageProblems } from "./components/ManageProblems/ManageProblems";
import { ManageResults } from "./components/ManageResults/ManageResults";
import { ErrorPage } from "../../ErrorPage";
const PageStrings = STRINGS.Pages.EditorCompetitionPage;

const TabValues = {
	INFO: 0,
	PROBLEMS: 1,
	REGISTRATIONS: 2,
	RESULTS: 3,
	RANKINGS: 4
}

export function EditorsCompetitionPage() {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const [tabValue, setTabValue] = useState<number>(TabValues.INFO);

	const { data: response, isLoading, error } = useCompetitionById(id!);

	if (response?.error && response.error.code === Errors.Competitions.NotFound) {
		navigate(Routes.NotFound);
		return;
	}

	const competition: ICompetitionInfo = response?.value as ICompetitionInfo;

	if (isLoading) {
		return <Spinner />
	}

	if (error) {
		return <ErrorPage errorCode="" />;
	}

	return <EditorsPageWrapper title={competition?.title} status={competition?.status}>
		{
			error
				? <ErrorMessage errorCode="" />
				: <div className={classNames.editorsCompetitionPage}>
					<ActionsContainer competition={competition!} />
					<Tabs value={tabValue}
						variant="scrollable"
						scrollButtons
						allowScrollButtonsMobile
						className={classNames.tabs}
						onChange={(_e, value) => setTabValue(value)}>
						<Tab className={classNames.tab} label={PageStrings.Tabs.Info} />
						<Tab className={classNames.tab} label={PageStrings.Tabs.Problems} />
						<Tab className={classNames.tab} label={PageStrings.Tabs.Registrations} />
						<Tab className={classNames.tab} label={PageStrings.Tabs.Results} />
						<Tab className={classNames.tab} label={PageStrings.Tabs.Rankings} />
					</Tabs>

					{
						tabValue === TabValues.INFO && <ManageCompetition competitionId={competition.id} />
					}
					{
						tabValue === TabValues.PROBLEMS && <ManageProblems competitionId={competition.id} />
					}
					{
						tabValue === TabValues.REGISTRATIONS && <ManageRegistrations competitionId={competition.id} />
					}
					{
						tabValue === TabValues.RESULTS && <ManageResults competitionId={competition.id} />
					}
					{
						tabValue === TabValues.RANKINGS && <Rankings competitionId={competition.id} />
					}
				</div>
		}
	</EditorsPageWrapper>;
}