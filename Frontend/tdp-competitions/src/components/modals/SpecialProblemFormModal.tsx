import { Box, Button, TextField } from "@mui/material";
import classNames from "../../App.module.scss";
import { STRINGS } from "../../consts/strings.consts";
import { specialProblemSchema } from "../../form-schemas/competitions.schemas";
import type { ISpecialProblem } from "../../models/competitions.models";
import { BaseModal, type IBaseModalProps } from "./BaseModal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage";
import { useAddSpecialProblem, useUpdateSpecialProblem } from "../../queries/competitions.queries";
import { Spinner } from "../Spinner";

const FormStrings = STRINGS.Modals.SpecialProblem;

interface ISpecialProblemFormModalProps extends IBaseModalProps {
	onUpdate: () => void;
	specialProblem?: ISpecialProblem;
	competitionId: string;
}

interface ISpecialProblemFormFields {
	title: string;
}

export function SpecialProblemFormModal(props: ISpecialProblemFormModalProps) {
	const { specialProblem, open, onClose, competitionId } = props;
	const { handleSubmit, register, formState: { errors }, reset } = useForm({
		resolver: yupResolver(specialProblemSchema)
	});

	const title = specialProblem ? FormStrings.Edit : FormStrings.New;
	const buttonTxt = specialProblem ? STRINGS.Edit : STRINGS.Create;

	const { data: addSpecialProblemResponse, error: addSpecialProblemError, mutateAsync: addSpecialProblemMutateAsync, isPending: addSpecialProblemIsPending } = useAddSpecialProblem(competitionId);
	const { data: updateSpecialProblemResponse, error: updateSpecialProblemError, mutateAsync: updateSpecialProblemMutateAsync, isPending: updateSpecialProblemIsPending } = useUpdateSpecialProblem(competitionId);

	const onSubmit = async (data: ISpecialProblemFormFields): Promise<void> => {
		if (addSpecialProblemIsPending || updateSpecialProblemIsPending) return;

		const specialProblemPayload: ISpecialProblem = {
			name: data.title,
			competitionId: competitionId,
			id: specialProblem?.id ?? ""
		};

		const result = specialProblem
			? await updateSpecialProblemMutateAsync(specialProblemPayload)
			: await addSpecialProblemMutateAsync(specialProblemPayload);


		if (result?.isSuccess) {
			props.onUpdate();
			reset();
		}
	}

	const errorCode: string = addSpecialProblemResponse?.error?.code ?? updateSpecialProblemResponse?.error?.code ?? '';

	return <BaseModal title={title} open={open} onClose={onClose}>
		<Box className={classNames.form}
			component="form"
			onSubmit={handleSubmit(onSubmit)}>

			<TextField
				label={FormStrings.Fields.Title}
				{...register("title")}
				error={!!errors.title}
				defaultValue={specialProblem?.name}
				helperText={errors.title?.message} />

			{
				(addSpecialProblemIsPending || updateSpecialProblemIsPending) && <Spinner />
			}

			{
				(addSpecialProblemError || updateSpecialProblemError || errorCode.length > 0) &&
				<ErrorMessage errorCode={errorCode ?? ''} />
			}

			<Button
				type="submit"
				variant="contained"
				disabled={addSpecialProblemIsPending || updateSpecialProblemIsPending}>
				{buttonTxt}
			</Button>
		</Box>

	</BaseModal>
}