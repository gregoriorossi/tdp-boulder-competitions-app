import { Tab, Tabs } from "@mui/material";
import classNames from "../../../../../App.module.scss";
import { ErrorMessage } from "../../../../../components/ErrorMessage";
import { Spinner } from "../../../../../components/Spinner";
import type { IRegistration } from "../../../../../models/competitors.models";
import { useProblemsByCompetition, useSentProblems } from "../../../../../queries/competitors.queries";
import { ProblemGroup } from "./ProblemGroup";
import { useState } from "react";

interface IProblemsProps {
	competitionId: string;
	registration: IRegistration;
	disableSending: boolean;
}

export function Problems(props: IProblemsProps) {
	const { competitionId, registration, disableSending } = props;
	const { data: response, isLoading, error } = useProblemsByCompetition(competitionId);
	const [tabValue, setTabValue] = useState<number>(0);

	const competitors = [registration.competitor, ...(registration.minors ?? [])];
	const selectedCompetitor = competitors[tabValue];

	const { data: competitorData, isLoading: isLoadingCompetitorData } = useSentProblems(
		competitionId,
		selectedCompetitor?.id ?? "",
		{
			enabled: !!selectedCompetitor?.id
		}
	);

	if (isLoading) {
		return <Spinner />;
	}

	if (error || response?.isFailure || !response?.value) {
		return <ErrorMessage errorCode={response?.error?.code ?? ''} />
	}

	return <div className={classNames.problems}>
		{
			competitors.length > 1 &&
			<Tabs value={tabValue}
				className={classNames.tabs}
				onChange={(_e, value) => setTabValue(value)}>
				{
					competitors.map(c => <Tab
						key={`tab-${c.id}`}
						label={`${c.lastName} ${c.firstName}`} />)
				}
			</Tabs>
		}


		{isLoadingCompetitorData ? (
			<Spinner />
		) : selectedCompetitor && (
			<ProblemGroup
				competitorId={selectedCompetitor.id}
				groups={response.value.problemsGroups}
				sentProblems={competitorData?.value?.sentProblems ?? []}
				disableSending={disableSending} />
		)}
	</div>
}