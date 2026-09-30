import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useEditorLogin } from "../../../queries/auth.queries";
import { Box, Button, TextField, Typography } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import classNames from "../../../App.module.scss";
import { Routes } from "../../../consts/routes.consts";
import { STRINGS } from "../../../consts/strings.consts";
import { useForm } from "react-hook-form";
import { editorLoginFormSchema } from "../../../form-schemas/auth.schemas";
import { Spinner } from "../../../components/Spinner";
import { ErrorMessage } from "../../../components/ErrorMessage";
const LoginPage = STRINGS.Pages.EditorsLoginPage;

interface ILoginFormValues {
	username: string;
	password: string;
}

export function EditorsLoginPage() {

	const navigate = useNavigate();
	const { data: loginData, isPending, mutateAsync: editorLoginAsync } = useEditorLogin();

	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(editorLoginFormSchema)
	});

	const onSubmitLogin = async (data: ILoginFormValues) => {

		const result = await editorLoginAsync({
			password: data.password,
			username: data.username
		});


		if (result.isSuccess) {
			navigate(Routes.EditorsHome);
			return;
		}
	}

	return <Box className={classNames.loginPage}>
		<Box component="form"
			className={classNames.form}
			onSubmit={(e) => {
				handleSubmit(onSubmitLogin)(e);
			}}>

			<Typography variant="h5" component="h2">
				<LoginIcon />&nbsp;{LoginPage.Title}
			</Typography>

			<TextField
				label={LoginPage.Form.Username}
				{...register("username")}
				autoComplete="on"
				error={!!errors.username}
				fullWidth
				helperText={errors.username?.message} />

			<TextField
				label={LoginPage.Form.Password}
				{...register("password")}
				type="password"
				autoComplete="off"
				fullWidth
				error={!!errors.password}
				helperText={errors.password?.message} />

			<Button type="submit" variant="contained">
				{LoginPage.Form.Submit}
			</Button>

			{
				isPending && <Spinner />
			}

			{
				(loginData?.error && !isPending) &&
				<ErrorMessage errorCode={loginData?.error?.code} />
			}
		</Box>
	</Box>;
}