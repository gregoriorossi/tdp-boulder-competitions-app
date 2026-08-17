import { useNavigate, useParams } from "react-router-dom"
import { Alert, AlertTitle, Button } from "@mui/material";
import { RegistrationForm } from "./components/RegistrationForm";
import { Routes } from "../../../consts/routes.consts";
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
	const [successMessageOpen, setSuccessMessageOpen] = useState<boolean>(false);

	const { data: response, isLoading } = useCompetitionBySlug(slug);

	if (isLoading) {
		return <Spinner />
	}

	if ((response?.error && response.error.code === Errors.Competitions.NotFound) || !response?.value) {
		navigate(Routes.NotFound);
		return null;
	}

	const competition = response.value;

	return <div className={classNames.registrationsPage}>
		<h1>{competition.title}</h1>

		<div dangerouslySetInnerHTML={{ __html: competition.description }}></div>

		{
			!competition.registrationsOpen &&
			<Alert severity="warning">
				{PageStrings.RegistrationsClosed}
			</Alert>
		}

		{
			competition.registrationsOpen && !successMessageOpen &&
			<RegistrationForm
				competitionId={competition.id}
				privacyFileUrl={competition.privacyAttachmentId}
				privacyText={competition.privacyText}
				onRegistration={() => setSuccessMessageOpen(true)} />
		}

		{
			successMessageOpen &&
			<Alert
				icon={false}
				sx={{
					justifyContent: 'center',
					'& .MuiAlert-message': {
						textAlign: 'center',
					},
				}}
				severity="success" className={classNames.successMessage}>
				<div>
					<AlertTitle>{PageStrings.SuccessMessage.Title}</AlertTitle>
					<p>{PageStrings.SuccessMessage.Content}</p>

					<Button
						title={PageStrings.SuccessMessage.NewRegistration}
						variant="contained"
						color="success"
						onClick={() => { setSuccessMessageOpen(false) }}>
						{PageStrings.SuccessMessage.NewRegistration}
					</Button>
				</div>
			</Alert>
		}
	</div>
}