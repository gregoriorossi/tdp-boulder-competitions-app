import { Box, Button, IconButton, TextField } from "@mui/material";
import { BaseModal, type IBaseModalProps } from "./BaseModal";
import type { IProblem } from "../../models/competitions.models";
import classNames from "../../App.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { problemSchema } from "../../form-schemas/competitions.schemas";
import { STRINGS } from "../../consts/strings.consts";
import { useDeleteProblem, useUpdateProblem } from "../../queries/competitions.queries";
import { Spinner } from "../Spinner";
import { ErrorMessage } from "../ErrorMessage";
import ConfirmationDialog from "../ConfirmationDialog";
import { useState } from "react";
import { Errors } from "../../consts/errors.consts";
const FormStrings = STRINGS.Modals.Problem;

interface IProblemFormModalProps extends IBaseModalProps {
	onUpdate: () => void;
	problem: IProblem;
}

interface IProblemFormFields {
	title: string;
}

export function ProblemFormModal(props: IProblemFormModalProps) {
	const { onClose, open, problem } = props;
	const { handleSubmit, register, formState: { errors }, reset } = useForm({
		resolver: yupResolver(problemSchema)
	});
	const [deleteProblemDialogOpen, setDeleteProblemDialogOpen] = useState<boolean>(false);

	const { data: deleteProblemResponse, error: deleteProblemError, mutateAsync: deleteProblemMutateAsync, isPending: deleteProblemIsPending } = useDeleteProblem(problem.competitionId);
	const { data: updateProblemResponse, error: updateProblemError, mutateAsync: updateProblemMutateAsync, isPending: updateProblemIsPending } = useUpdateProblem(problem.competitionId);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const onSubmit = async (data: IProblemFormFields): Promise<void> => {
		if (deleteProblemIsPending || updateProblemIsPending) return;

		const problemPayload: IProblem = {
			name: data.title.trim(),
			competitionId: problem.competitionId,
			problemGroupId: problem.problemGroupId,
			id: problem.id
		};

		const result = await updateProblemMutateAsync(problemPayload);

		if (result?.isSuccess) {
			props.onUpdate();
			reset();
		}
	}

	const onDeleteHandler = async (problem: IProblem) => {
		try {
			const data = await deleteProblemMutateAsync(problem);
			if (data.isSuccess) {
				setDeleteProblemDialogOpen(false);
				setErrorMessage(null);
				return;
			}
			setErrorMessage(data.error?.code ?? null);
		} catch (e) {
			console.log(e);
			setErrorMessage(Errors.Generic)
		}
	}

	const errorCode: string = deleteProblemResponse?.error?.code ?? updateProblemResponse?.error?.code ?? '';
	const errorMessageStr: string | null = errorMessage ?? (deleteProblemError ? Errors.Generic : null);


	return <BaseModal
		title={FormStrings.Title}
		open={open}
		onClose={onClose}>

		<Box className={classNames.form}
			component="form"
			onSubmit={handleSubmit(onSubmit)}>

			<TextField
				label={FormStrings.Fields.Title}
				{...register("title")}
				error={!!errors.title}
				defaultValue={problem.name}
				helperText={errors.title?.message} />

			{
				(deleteProblemIsPending || updateProblemIsPending) && <Spinner />
			}

			{
				(deleteProblemError || updateProblemError || errorCode.length > 0) &&
				<ErrorMessage errorCode={errorCode ?? ''} />
			}

			<Button type="submit" variant="contained" disabled={updateProblemIsPending}>
				{STRINGS.Save}
			</Button>

			<Button color="error" variant="contained" disabled={updateProblemIsPending} onClick={() => setDeleteProblemDialogOpen(true)}>
				{STRINGS.Delete}
			</Button>

		</Box>

		<ConfirmationDialog
			isOpen={deleteProblemDialogOpen}
			title={STRINGS.Dialogs.DeleteProblem.Title(problem.name)}
			cancelBtnLabel={STRINGS.Cancel}
			confirmBtnLabel={STRINGS.Delete}
			isLoading={deleteProblemIsPending}
			error={errorMessageStr}
			content={STRINGS.Dialogs.DeleteProblem.Content}
			onCancel={() => { setDeleteProblemDialogOpen(false) }}
			onClose={() => { setDeleteProblemDialogOpen(false) }}
			onConfirm={() => onDeleteHandler(props.problem)} />
	</BaseModal>;
}