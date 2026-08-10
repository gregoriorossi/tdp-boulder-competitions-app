import { useParams, useNavigate } from "react-router-dom";
import { CompetitorsPageWrapper } from "../CompetitorsPageWrapper";
import { useCompetitionBySlug } from "../../../queries/competitions.queries";
import { Spinner } from "../../../components/Spinner";
import { Routes } from "../../../consts/routes.consts";
import { Errors } from "../../../consts/errors.consts";
import { Tab, Tabs } from "@mui/material";
import classNames from "../../../App.module.scss";
import { useState } from "react";
import { STRINGS } from "../../../consts/strings.consts";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { Info } from "./components/Info";
import { Rankings } from "./components/Rankings";
const PageStrings = STRINGS.Pages.CompetitorCompetitionPage;

const TabValues = {
    INFO: 0,
    PROBLEMS: 1,
    RANKINGS: 2,
    PERSONAL_DATA: 3
}

export function CompetitionPage() {
    const params = useParams();
    const navigate = useNavigate();
    const slug: string = params.slug!;
    const [tabValue, setTabValue] = useState<number>(TabValues.INFO);

    const { data: response, isLoading, error } = useCompetitionBySlug(slug);

    if (isLoading) {
        return <Spinner />
    }

    if ((response?.error && response.error.code === Errors.Competitions.NotFound) || !response?.value) {
        navigate(Routes.NotFound);
        return null;
    }

    return <CompetitorsPageWrapper title={response.value.title} >
        <Tabs value={tabValue}
            className={classNames.tabs}
            onChange={(_e, value) => setTabValue(value)}>
            <Tab className={classNames.tab} label={PageStrings.Tabs.Info} />
            <Tab className={classNames.tab} label={PageStrings.Tabs.Problems} />
            <Tab className={classNames.tab} label={PageStrings.Tabs.Rankings} />
            <Tab className={classNames.tab} label={PageStrings.Tabs.PersonalData} />
        </Tabs>

        {
            error && <ErrorMessage errorCode="" />
        }

        {
            tabValue === TabValues.INFO && <Info competition={response.value} />
        }

        {
            tabValue === TabValues.RANKINGS && <Rankings competitionId={response.value.id} />
        }
    </CompetitorsPageWrapper>
}