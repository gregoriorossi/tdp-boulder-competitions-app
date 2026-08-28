import { useNavigate, useParams } from "react-router-dom"
import { Alert, AlertTitle, Button } from "@mui/material";
import { RegistrationForm } from "./components/RegistrationForm";
import { Routes } from "../../../consts/routes.consts";
import { Spinner } from "../../../components/Spinner";
import { STRINGS } from "../../../consts/strings.consts";
import classNames from "../../../App.module.scss";
import { useCompetitionBySlug } from "../../../queries/competitors.queries";
import { useState } from "react";
import { ErrorPage } from "../../ErrorPage";
import axios from "axios";
import { Footer } from "../../../components/Footer";
import logoTesteDiPietra from '../../../assets/teste-di-pietra_logo.png';

const PageStrings = STRINGS.Pages.RegistrationPage;

export function RegistrationPage() {
	const params = useParams();
	const navigate = useNavigate();
	const slug: string = params.slug!;
	const [successMessageOpen, setSuccessMessageOpen] = useState<boolean>(false);

	const { data: response, isLoading, error } = useCompetitionBySlug(slug);

	if (isLoading) {
		return <Spinner />
	}

	if (axios.isAxiosError(error) && error.response?.status === 404) {
		navigate(Routes.NotFound);
		return null;
	}

	if (error || !response?.value) {
		return <ErrorPage errorCode="" />;
	}


	const competition = response.value;

	return <div className={classNames.registrationsPage}>
		<div className={classNames.titleContainer}>
			<img src={logoTesteDiPietra}
				className={classNames.logo} />
			<h1>{competition.title}</h1>
		</div>
		

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
		<Footer />
	</div>
}