import { Box } from "@mui/material";
import classNames from "../../App.module.scss";
import logoTesteDiPietra from '../../assets/teste-di-pietra_logo.png';
import { useNavigate } from "react-router-dom";
import { Routes } from "../../consts/routes.consts";
import { Status } from "../../components/CompetitionStatus";
import { useCompetitorAuth } from "../../hooks/useCompetitorAuth";
import { AuthConsts } from "../../consts/auth.consts";
import type { ILoginCompetitorResponse } from "../../models/auth.api.models";
import StorageService from "../../services/storage.service";
import type { ICompetition } from "../../models/competitors.models";
import { Footer } from "../../components/Footer";
import { UserMenu } from "../../components/UserMenu";

interface ICompetitorsPageWrapperProps extends React.ComponentProps<typeof Box> {
	competition: ICompetition;
	registrationId: string;
}

export function CompetitorsPageWrapper(props: ICompetitorsPageWrapperProps) {
	const { competition, registrationId } = props;
	const navigate = useNavigate();
	const { isAuthenticated } = useCompetitorAuth({
		redirectRoute: Routes.CompetitorLogin
	});

	if (!isAuthenticated) {
		navigate(Routes.CompetitorLogin);
	}

	const jwt = StorageService.getItemAsJson<ILoginCompetitorResponse>(AuthConsts.LOCAL_STORAGE_COMPETITOR_LOGIN_INFO);

	return <Box className={classNames.competitorsPageWrapper}>
		<div className={classNames.header}>
			<img src={logoTesteDiPietra}
				className={classNames.logo}
				onClick={() => navigate(Routes.CompetitorLogin)} />
			<div className={classNames.titleContainer}>
				<h2>{competition.title}&nbsp;<Status status={competition.status} /></h2>
				<h4></h4>
			</div>

			<UserMenu
				userEmail={jwt?.userInfo?.email ?? ''}
				competitionId={competition.id}
				registrationId={registrationId} />
		</div>
		<div className={`${classNames.container} ${props.className ?? ''}`}>
			{props.children}
		</div>
		<Footer />
	</Box>;
}