import { Box } from "@mui/material";
import classNames from "../../App.module.scss";
import logoTesteDiPietra from '../../assets/teste-di-pietra_logo.png';
import { useNavigate } from "react-router-dom";
import { Routes } from "../../consts/routes.consts";
import type { CompetitionStatus } from "../../models/competitions.models";
import { Status } from "../../components/CompetitionStatus";
import { useEditorsAuth } from "../../hooks/useEditorsAuth";
import { Footer } from "../../components/Footer";
import { EditorsMenu } from "../../components/EditorsMenu";
import { AuthConsts } from "../../consts/auth.consts";
import type { ILoginEditorResponse } from "../../models/auth.api.models";
import StorageService from "../../services/storage.service";

interface IEditorsPageWrapperProps extends React.ComponentProps<typeof Box> {
	title: string;
	status?: CompetitionStatus;
}

export function EditorsPageWrapper(props: IEditorsPageWrapperProps) {

	const navigate = useNavigate();
	const { isAuthenticated } = useEditorsAuth({
		redirectRoute: Routes.EditorsLogin
	});

	if (!isAuthenticated) {
		navigate(Routes.EditorsLogin);
	}

	const jwt = StorageService.getItemAsJson<ILoginEditorResponse>(AuthConsts.LOCAL_STORAGE_EDITOR_LOGIN_INFO);
	
	return <Box className={classNames.editorsPageWrapper}>
		<div className={classNames.header}>
			<a href={Routes.EditorsHome}>
				<img src={logoTesteDiPietra} className={classNames.logo} />
			</a>
			<h2>{props.title}&nbsp;<Status status={props.status} />
			</h2>

			<EditorsMenu userEmail={jwt?.userInfo?.username ?? ''} />
		</div>
		<div className={`${classNames.editorPageContainer} ${props.className ?? ''}`}>
			{props.children}
		</div>
		<Footer />
	</Box>;
}