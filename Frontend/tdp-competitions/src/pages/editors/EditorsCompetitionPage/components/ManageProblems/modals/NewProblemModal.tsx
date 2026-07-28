import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import classNames from "../../../../../../App.module.scss";
import { ErrorMessage } from "../../../../../../components/ErrorMessage";
import { type IBaseModalProps, BaseModal } from "../../../../../../components/modals/BaseModal";
import { Spinner } from "../../../../../../components/Spinner";
import { Errors } from "../../../../../../consts/errors.consts";
import { STRINGS } from "../../../../../../consts/strings.consts";
import { problemSchema } from "../../../../../../form-schemas/competitions.schemas";
import type { IProblem } from "../../../../../../models/competitions.models";
import { useAddProblem } from "../../../../../../queries/competitions.queries";

const FormStrings = STRINGS.Modals.Problem;

interface INewProblemModalProps extends IBaseModalProps {
	onAdded: (problem: IProblem) => void;
	competitionId: string;
	problemsGroupId: string;
}

interface IProblemFormFields {
	title: string;
}

export function NewProblemModal(props: INewProblemModalProps) {
	const { open, onClose, competitionId, onAdded, problemsGroupId } = props;

	const { handleSubmit, register, formState: { errors }, reset } = useForm({
		resolver: yupResolver(problemSchema)
	});

	const { data: addProblemResponse, error: addProblemError, mutateAsync: addProblemMutateAsync, isPending: addProblemIsPending } = useAddProblem(competitionId);

	const onSubmit = async (data: IProblemFormFields) => {
		if (addProblemIsPending) return;

		const problemPayload: IProblem = {
			name: data.title.trim(),
			competitionId: competitionId,
			problemGroupId: problemsGroupId
		};

		const result = await addProblemMutateAsync(problemPayload);

		if (result?.isSuccess) {
			onAdded(result.value);
			reset();
		}
	}

	const errorCode: string | null = addProblemResponse?.error?.code ?? (addProblemError ? Errors.Generic : null);

	return <BaseModal
		title={FormStrings.TitleNew}
		open={open}
		onClose={onClose}>

		<Box className={classNames.form}
			component="form"
			onSubmit={handleSubmit(onSubmit)}>

			<TextField
				label={FormStrings.Fields.Title}
				{...register("title")}
				error={!!errors.title}
				helperText={errors.title?.message} />

			{
				addProblemIsPending && <Spinner />
			}

			{
				errorCode &&
				<ErrorMessage errorCode={errorCode ?? ''} />
			}

			<Button type="submit" variant="contained" disabled={addProblemIsPending}>
				{STRINGS.Save}
			</Button>

		</Box>
	</BaseModal>;
}