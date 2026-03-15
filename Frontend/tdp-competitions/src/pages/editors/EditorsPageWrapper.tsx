import { Box } from "@mui/material";
import classNames from "../../App.module.scss";
import logoTesteDiPietra from '../../assets/teste-di-pietra_logo.png';
import { useNavigate } from "react-router-dom";
import { Routes } from "../../consts/routes.consts";

interface IEditorsPageWrapperProps extends React.ComponentProps<typeof Box> {
	title: string;
}

export function EditorsPageWrapper(props: IEditorsPageWrapperProps) {

	const navigate = useNavigate();
	const onLogoClick = () => {
		navigate(Routes.EditorsHome);
	}
	return <Box className={classNames.editorsPageWrapper}>
		<div className={classNames.header}>
			<img src={logoTesteDiPietra} className={classNames.logo} onClick={onLogoClick} />
			<h2>{props.title}</h2>
		</div>
		<div className={`${classNames.editorPageContainer} ${props.className ?? ''}`}>
			{props.children}
		</div>
	</Box>;
}