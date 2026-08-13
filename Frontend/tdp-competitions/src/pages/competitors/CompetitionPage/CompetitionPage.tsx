import { useParams, useNavigate } from "react-router-dom";
import { CompetitorsPageWrapper } from "../CompetitorsPageWrapper";
import { Spinner } from "../../../components/Spinner";
import { Routes } from "../../../consts/routes.consts";
import { Errors } from "../../../consts/errors.consts";
import { Button, Tab, Tabs } from "@mui/material";
import classNames from "../../../App.module.scss";
import { useState } from "react";
import { STRINGS } from "../../../consts/strings.consts";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { Info } from "./components/Info";
import { Rankings } from "./components/Rankings";
import { Problems } from "./components/Problems/Problems";
import { useDeleteRegistration, useGetCompetitionAndRegistrationDataBySlug } from "../../../queries/competitors.queries";
const PageStrings = STRINGS.Pages.CompetitorCompetitionPage;
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationDialog from "../../../components/ConfirmationDialog";

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
    const [deleteRegistrationDialogOpen, setDeleteRegistrationDialogOpen] = useState<boolean>(false);
    const { error: deleteError, mutateAsync: deleteRegistrationAsync, isPending: isDeletePending } = useDeleteRegistration();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { data: response, isLoading, error } = useGetCompetitionAndRegistrationDataBySlug(slug);

    if (isLoading) {
        return <Spinner />
    }

    if ((response?.error && response.error.code === Errors.Competitions.NotFound) || !response?.value) {
        navigate(Routes.NotFound);
        return null;
    }

    const onDeleteRegistrationHandler = async (): Promise<void> => {
        const competition = response.value?.competition;
        const registration = response.value?.registration;
        if (!competition || !registration) {
            return;
        }

        try {
            const data = await deleteRegistrationAsync({
                competitionId: competition.id,
                registrationId: registration.id
            });
            if (data.isSuccess) {
                setErrorMessage(null);
                setDeleteRegistrationDialogOpen(false);
				navigate(Routes.CompetitorLogin);
                return;
            }
            setErrorMessage(data.error?.code ?? Errors.Generic);
        } catch (e) {
            console.log(e);
            setErrorMessage(Errors.Generic);
        }
    }

    const competition = response.value.competition;
    const registration = response.value.registration;
    const errorMessageStr: string | null = errorMessage ?? (deleteError ? Errors.Generic : null);

    return <CompetitorsPageWrapper title={competition.title}>
        <div className={classNames.actionsContainer}>
            <Button
                title={PageStrings.DeleteRegistration.ButtonText}
                variant="contained"
                color="error"
                onClick={() => { setDeleteRegistrationDialogOpen(true) }}>
                <DeleteIcon />&nbsp;
                {PageStrings.DeleteRegistration.ButtonText}
            </Button>
        </div>
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
            tabValue === TabValues.INFO && <Info competition={competition} />
        }
        {
            tabValue === TabValues.PROBLEMS &&
            <Problems
                competitionId={competition.id}
                registration={registration}
                disableSending={!competition.isOpen} />
        }
        {
            tabValue === TabValues.RANKINGS &&
            <Rankings
                competitionId={competition.id}
                rankingsVisible={competition.rankingsVisible} />
        }

        <ConfirmationDialog
            isOpen={deleteRegistrationDialogOpen}
            title={PageStrings.DeleteRegistration.ConfirmationDialogTitle}
            cancelBtnLabel={STRINGS.Cancel}
            confirmBtnLabel={STRINGS.Delete}
            isLoading={isDeletePending}
            error={errorMessageStr}
            content={PageStrings.DeleteRegistration.ConfirmationDialogContent}
            onCancel={() => { setDeleteRegistrationDialogOpen(false) }}
            onClose={() => { setDeleteRegistrationDialogOpen(false) }}
            onConfirm={onDeleteRegistrationHandler} />
    </CompetitorsPageWrapper>
}