import { Box } from "@mui/material";
import classNames from "../../App.module.scss";
import logoTesteDiPietra from '../../assets/teste-di-pietra_logo.png';
import { useNavigate } from "react-router-dom";
import { Routes } from "../../consts/routes.consts";
import type { CompetitionStatus } from "../../models/competitions.models";
import { Status } from "../../components/CompetitionStatus";
import { useCompetitorAuth } from "../../hooks/useCompetitorAuth";
import { AuthConsts } from "../../consts/auth.consts";
import type { ILoginCompetitorResponse } from "../../models/auth.api.models";
import StorageService from "../../services/storage.service";

interface ICompetitorsPageWrapperProps extends React.ComponentProps<typeof Box> {
	title: string;
	status?: CompetitionStatus;
}

export function CompetitorsPageWrapper(props: ICompetitorsPageWrapperProps) {

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
				<h2>{props.title}&nbsp;<Status status={props.status} /></h2>
				<h4>{jwt?.userInfo?.email}</h4>
			</div>
		</div>
		<div className={`${classNames.container} ${props.className ?? ''}`}>
			{props.children}
		</div>
	</Box>;
}