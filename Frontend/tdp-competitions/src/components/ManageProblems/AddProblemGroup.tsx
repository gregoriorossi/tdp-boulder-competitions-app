import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { STRINGS } from "../../consts/strings.consts";
import type { IProblemsGroup } from "../../models/competitions.models";
import classNames from "../../App.module.scss";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { problemGroupSchema } from "../../form-schemas/competitions.schemas";
import { allColors, getSelectableColors } from "../../utils/problems.utils";
import AddIcon from '@mui/icons-material/Add';

const AddProblemsGroupStrings = STRINGS.Forms.AddProblemsGroup;

interface IAddProblemGroupProps {
	onAdd: (group: IProblemsGroup) => void;
	competitionId: string;
	order: number;
	selectedGroups: IProblemsGroup[];
}

interface IProblemsGroupFields {
	colorCode: string;
}

export function AddProblemGroup(props: IAddProblemGroupProps) {
	const { competitionId, onAdd, order, selectedGroups } = props;


	const colors = getSelectableColors(allColors, selectedGroups);
	const { control, handleSubmit, formState: { errors }, reset, resetField } = useForm({
		resolver: yupResolver(problemGroupSchema(colors))
	});

	const onSubmit = async (data: IProblemsGroupFields) => {
		const group: IProblemsGroup = {
			colorCode: data.colorCode,
			competitionId: competitionId,
			order: order,
			problems: []
		};
		reset();
		onAdd(group);
	}

	return <Box className={`${classNames.form} ${classNames.addProblemsGroup}`}
		component="form"
		onSubmit={handleSubmit(onSubmit)}>

		<FormControl error={!!errors.colorCode} className={classNames.select}>
			<InputLabel>{AddProblemsGroupStrings.Title}</InputLabel>
			<Controller
				name="colorCode"
				control={control}
				rules={{ required: AddProblemsGroupStrings.ChooseColor }}
				render={({ field }) => (
					<Select
						labelId="color-label"
						key={field.value || "empty" }
						renderValue={
							(selected) => (
								<div style={{ backgroundColor: selected, color: selected }}
									className={classNames.colorLabel}>&nbsp;</div>
							)
						}
						label="type" {...field}>
						{
							colors.map((c, idx) =>
								<MenuItem value={c} key={idx} className={classNames.colorOption}>
									<div style={{ backgroundColor: c }}
										className={classNames.colorLabel}></div>
								</MenuItem>
							)
						}
					</Select>
				)} />
			{errors.colorCode && (
				<Typography variant="caption" color="error">
					{errors.colorCode.message}
				</Typography>
			)}
		</FormControl>

		<Button
			type="submit"
			variant="contained"
			title={STRINGS.Add}>
			<AddIcon />
		</Button>
	</Box>;
}