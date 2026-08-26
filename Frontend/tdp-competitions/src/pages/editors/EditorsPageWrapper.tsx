import { Box, Button } from "@mui/material";
import { LogoutOutlined } from "@mui/icons-material";
import classNames from "../../App.module.scss";
import logoTesteDiPietra from '../../assets/teste-di-pietra_logo.png';
import { useNavigate } from "react-router-dom";
import { Routes } from "../../consts/routes.consts";
import type { CompetitionStatus } from "../../models/competitions.models";
import { Status } from "../../components/CompetitionStatus";
import { useEditorLogout, useEditorsAuth } from "../../hooks/useEditorsAuth";
import { STRINGS } from "../../consts/strings.consts";

interface IEditorsPageWrapperProps extends React.ComponentProps<typeof Box> {
	title: string;
	status?: CompetitionStatus;
}

export function EditorsPageWrapper(props: IEditorsPageWrapperProps) {

	const navigate = useNavigate();
	const { logout } = useEditorLogout();
	const { isAuthenticated } = useEditorsAuth({
		redirectRoute: Routes.EditorsLogin
	});

	const onLogoClick = () => {
		navigate(Routes.EditorsHome);
	}

	const handleLogout = () => {
		logout();
	}

	if (!isAuthenticated) {
		navigate(Routes.EditorsLogin);
	}

	return <Box className={classNames.editorsPageWrapper}>
		<div className={classNames.header}>
			<img src={logoTesteDiPietra} className={classNames.logo} onClick={onLogoClick} />
			<h2>{props.title}&nbsp;<Status status={props.status} />
			</h2>
			<Button
				variant="contained"
				color="error"
				startIcon={<LogoutOutlined />}
				onClick={handleLogout}>
				{STRINGS.Logout}
			</Button>
		</div>
		<div className={`${classNames.editorPageContainer} ${props.className ?? ''}`}>
			{props.children}
		</div>
	</Box>;
}