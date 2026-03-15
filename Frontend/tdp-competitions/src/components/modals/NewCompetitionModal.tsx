import *  as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { STRINGS } from "../../consts/strings.consts";
import { Alert, Box, Button, CircularProgress, TextField } from "@mui/material";
import { useAddCompetition } from "../../queries/competitions.queries";
import { ErrorMessage } from "../ErrorMessage";
import classNames from "../../App.module.scss";
import { BaseModal, type IBaseModalProps } from "./BaseModal";
const FormStrings = STRINGS.Modals.NewCompetition;

interface INewCompetitionModalProps extends IBaseModalProps {
	onCreated: () => void;
}

interface INewCompetitionFields {
	title: string;
}

const schema = yup.object({
	title: yup.string()
		.min(5, FormStrings.Errors.TitleLength)
		.required(FormStrings.Errors.Title),
	//date: yup.date().required()
});

export function NewCompetitionModal(props: INewCompetitionModalProps) {
	const { handleSubmit, register, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	});

	const { data: addCompetitionResponse, error, mutateAsync: addCompetitionAsync, isPending } = useAddCompetition();

	const onSubmit = async (data: INewCompetitionFields): Promise<void> => {
		console.log(data);
		await addCompetitionAsync(data.title);

		if (addCompetitionResponse?.isSuccess) {
			props.onCreated();
		}
	}

	return <BaseModal
		title={FormStrings.Title}
		open={props.open}
		onClose={props.onClose}>
		<Box className={classNames.form}
			component="form"
			onSubmit={handleSubmit(onSubmit)}>

			<TextField
				label="Nome"
				{...register("title")}
				error={!!errors.title}
				helperText={errors.title?.message} />



			{
				isPending &&
				<div className={classNames.horizontallyCentered}>
					<CircularProgress />
				</div>
			}

			{
				(error || addCompetitionResponse?.error?.description) &&
				<Alert severity="error">
					<ErrorMessage errorCode={addCompetitionResponse?.error?.code ?? ''} />
				</Alert>
			}

			<Button type="submit" variant="contained" disabled={isPending}>
				{STRINGS.Create}
			</Button>
		</Box>
	</BaseModal>
}