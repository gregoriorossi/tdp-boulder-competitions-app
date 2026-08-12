import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import classNames from "../../../App.module.scss";
import { STRINGS } from "../../../consts/strings.consts";
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCompetitorLogin } from "../../../queries/auth.queries";
import { competitorLoginFormSchema } from "../../../form-schemas/auth.schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { QueryParams, Routes } from "../../../consts/routes.consts";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Spinner } from "../../../components/Spinner";
import DangerousIcon from '@mui/icons-material/Dangerous';
import { useCompetitions } from "../../../queries/competitors.queries";
import { ErrorMessage } from "../../../components/ErrorMessage";
import logoTesteDiPietra from '../../../assets/teste-di-pietra_logo.png';

const LoginPageStrings = STRINGS.Pages.CompetitorsLoginPage;

interface ICompetitorLoginFormValues {
	email: string;
	competitionId: string;
}

export function LoginPage() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const hint = searchParams.get(QueryParams.Hint);

	const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
	const { isPending, mutateAsync: competitorLoginAsync } = useCompetitorLogin();

	const { data: useCompetitionsResponse, isLoading, error: useCompetitionsError } = useCompetitions();
	const { control, register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(competitorLoginFormSchema)
	});

	const onSubmitLogin = async (data: ICompetitorLoginFormValues) => {
		const result = await competitorLoginAsync({
			email: data.email.trim(),
			competitionId: data.competitionId
		});


		if (result) {
			const slug = useCompetitionsResponse?.value?.find(c => c.id === data.competitionId)?.slug;
			navigate(Routes.Competition(slug!));
			return;
		}

		setShowErrorMessage(true);
	}

	if (isLoading) {
		return <Spinner />
	}

	if (useCompetitionsError || !useCompetitionsResponse || useCompetitionsResponse?.isFailure || !useCompetitionsResponse?.value) {
		return <ErrorMessage errorCode={useCompetitionsResponse?.error?.code ?? ''} />
	}

	const defaultCompetitionId = (useCompetitionsResponse?.value ?? [])
		.find(c => c.slug.toLowerCase() === hint?.toLocaleLowerCase())?.id;


	return <Box className={classNames.loginPage}>
		<div className={classNames.header}>
			<img src={logoTesteDiPietra} className={classNames.logo} />
		</div>
		<Box component="form"
			className={classNames.form}
			onSubmit={(e) => {
				handleSubmit(onSubmitLogin)(e);
			}}>

			<Typography variant="h5" component="h2">
				{LoginPageStrings.Title}
			</Typography>
			<p>{LoginPageStrings.Subtitle}</p>

			<FormControl error={!!errors.competitionId} className={classNames.select}>
				<InputLabel>{LoginPageStrings.Form.Competition}</InputLabel>
				<Controller
					name="competitionId"
					control={control}
					defaultValue={defaultCompetitionId}
					render={({ field }) => (
						<Select
							labelId="color-label"
							key={field.value || "empty"}
							label="type" {...field}>
							{
								(useCompetitionsResponse.value || []).map((g) =>
									<MenuItem value={g.id} key={g.id}>
										{g.title}
									</MenuItem>
								)
							}
						</Select>
					)} />
				{errors.competitionId && (
					<Typography variant="caption" color="error">
						{errors.competitionId.message}
					</Typography>
				)}
			</FormControl>

			<TextField
				label={LoginPageStrings.Form.Email}
				{...register("email")}
				autoComplete="on"
				error={!!errors.email}
				fullWidth
				helperText={errors.email?.message} />

			<Button type="submit" variant="contained">
				{LoginPageStrings.Form.Submit}
			</Button>

			{
				isPending && <Spinner />
			}

			{
				(showErrorMessage && !isPending) &&
				<Alert severity="error" icon={<DangerousIcon />}>
					{LoginPageStrings.Form.Errors.WrongCredentials}
				</Alert>
			}
		</Box>
	</Box>;
}
