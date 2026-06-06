import { useNavigate, useParams } from "react-router-dom"
import { Alert } from "@mui/material";
import { RegistrationForm } from "./components/RegistrationForm";
import { useCompetitionBySlug } from "../../../queries/competitions.queries";
import { Routes } from "../../../consts/routes.consts";
import type { ICompetitionInfo } from "../../../models/competitions.models";
import { Spinner } from "../../../components/Spinner";
import FilesService from "../../../services/files.service";
import { Errors } from "../../../consts/errors.consts";
import { STRINGS } from "../../../consts/strings.consts";
import classNames from "../../../App.module.scss";

const PageStrings = STRINGS.Pages.RegistrationPage;

export function RegistrationPage() {
	const params = useParams();
	const navigate = useNavigate();
	const slug: string = params.slug!;

	const { data: response, isLoading, error } = useCompetitionBySlug(slug);


	if (response?.error && response.error.code === Errors.Competitions.NotFound) {
		navigate(Routes.NotFound);
		return;
	}

	if (isLoading) {
		return <Spinner />
	}


	const competition: ICompetitionInfo = response?.value as ICompetitionInfo;
	const bannerImageUrl: string | null = competition.bannerImageId ? FilesService.getFileUrl(competition.bannerImageId) : null;

	return <div className={classNames.registrationsPage}>
		{
			bannerImageUrl && <div className={classNames.banner} style={{ backgroundImage: `url("${bannerImageUrl}")` }}></div>
		}
		<h1>{competition.title}</h1>

		<div dangerouslySetInnerHTML={{ __html: competition.description }}></div>

		{
			!competition.registrationsOpen ?
				<Alert severity="warning">
					{PageStrings.RegistrationsClosed}
				</Alert>
				: <RegistrationForm
					competitionId={competition.id}
					privacyFileUrl={competition.privacyAttachmentId}				/>
		}
	</div>
}