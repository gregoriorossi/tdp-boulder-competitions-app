import { Alert, Tab, Tabs } from "@mui/material";
import classNames from "../../../../../App.module.scss";
import { ErrorMessage } from "../../../../../components/ErrorMessage";
import { Spinner } from "../../../../../components/Spinner";
import type { IRegistration } from "../../../../../models/competitors.models";
import { useProblemsByCompetition, useSentProblems } from "../../../../../queries/competitors.queries";
import { ProblemGroup } from "./ProblemGroup";
import { useState } from "react";
import WarningIcon from '@mui/icons-material/Warning';
import { STRINGS } from "../../../../../consts/strings.consts";
import { SpecialProblems } from "./SpecialProblems";
import type { ICompetition } from "../../../../../models/competitors.models";
import { CompetitionStatus } from "../../../../../models/competitions.models";

interface IProblemsProps {
	competition: ICompetition;
	registration: IRegistration;
}

export function Problems(props: IProblemsProps) {
	const { competition, registration } = props;
	const { data: response, isLoading, error } = useProblemsByCompetition(competition.id);
	const [tabValue, setTabValue] = useState<number>(0);

	const competitors = registration.competitor.guardianOnly
		? [...(registration.minors ?? [])]
		: [registration.competitor, ...(registration.minors ?? [])];

	const selectedCompetitor = competitors[tabValue];

	const { data: competitorData, isLoading: isLoadingCompetitorData } = useSentProblems(
		competition.id,
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

	const disableSending = !competition.isOpen;

	return <div className={classNames.problems}>
		{
			competitors.length > 1 &&
			<Tabs value={tabValue}
				className={classNames.tabs}
				sx={{
					"& .MuiTab-root": {
						backgroundColor: "#fff",
						color: "#ff8f00",
					},
					"& .MuiTab-root.Mui-selected": {
						backgroundColor: "#ff8f00",
						color: "#fff",
					},
					"& .MuiTabs-indicator": {
						display: "none",
					}
				}}
				onChange={(_e, value) => setTabValue(value)}>
				{
					competitors.map(c => <Tab
						key={`tab-${c.id}`}
						label={`${c.lastName} ${c.firstName}`} />)
				}
			</Tabs>
		}
		{
			disableSending &&
			<Alert severity="warning" icon={<WarningIcon />} className={classNames.infoMessage}>
				{competition.status === CompetitionStatus.CLOSED && STRINGS.Pages.CompetitorCompetitionPage.Problems.SendDisabledClosed}
				{competition.status === CompetitionStatus.DRAFT && STRINGS.Pages.CompetitorCompetitionPage.Problems.SendDisabledDraft}
			</Alert>
		}

		{isLoadingCompetitorData ? (
			<Spinner />
		) : selectedCompetitor && (<>
			<SpecialProblems
				competitorId={selectedCompetitor.id}
				disableSending={disableSending}
				sent={competitorData?.value?.sentSpecialProblems ?? []}
				specialProblems={response.value.specialProblems}
			/>
			<ProblemGroup
				competitorId={selectedCompetitor.id}
				groups={response.value.problemsGroups}
				sentProblems={competitorData?.value?.sentProblems ?? []}
				disableSending={disableSending} />
		</>
		)}
	</div>
}