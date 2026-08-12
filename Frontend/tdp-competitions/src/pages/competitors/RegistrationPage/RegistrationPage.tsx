import { useNavigate, useParams } from "react-router-dom"
import { Alert, Snackbar } from "@mui/material";
import { RegistrationForm } from "./components/RegistrationForm";
import { Routes } from "../../../consts/routes.consts";
import type { ICompetitionInfo } from "../../../models/competitions.models";
import { Spinner } from "../../../components/Spinner";
import { Errors } from "../../../consts/errors.consts";
import { STRINGS } from "../../../consts/strings.consts";
import classNames from "../../../App.module.scss";
import { useCompetitionBySlug } from "../../../queries/competitors.queries";
import { useState } from "react";

const PageStrings = STRINGS.Pages.RegistrationPage;

export function RegistrationPage() {
	const params = useParams();
	const navigate = useNavigate();
	const slug: string = params.slug!;
	const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

	const { data: response, isLoading } = useCompetitionBySlug(slug);

	if (isLoading) {
		return <Spinner />
	}

	if ((response?.error && response.error.code === Errors.Competitions.NotFound) || !response?.value) {
		navigate(Routes.NotFound);
		return null;
	}

	const competition: ICompetitionInfo = response.value as ICompetitionInfo;

	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};

	return <div className={classNames.registrationsPage}>
		<h1>{competition.title}</h1>

		<div dangerouslySetInnerHTML={{ __html: competition.description }}></div>

		{
			!competition.registrationsOpen ?
				<Alert severity="warning">
					{PageStrings.RegistrationsClosed}
				</Alert>
				: <RegistrationForm
					competitionId={competition.id}
					privacyFileUrl={competition.privacyAttachmentId}
					privacyText={competition.privacyText}
					onRegistration={() => setSnackbarOpen(true)} />
		}

		{
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={10000}
				key="success-snackbar"
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
				<Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
					<h3>{PageStrings.SuccessMessage.Title}</h3>
					<p>{PageStrings.SuccessMessage.Content}</p>
				</Alert>
			</Snackbar>
		}
	</div>
}