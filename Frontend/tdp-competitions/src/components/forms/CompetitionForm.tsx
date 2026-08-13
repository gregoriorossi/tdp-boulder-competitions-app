import { Button, Chip, FormControl, FormControlLabel, FormLabel, Grid, Switch, TextField, Typography } from "@mui/material";
import type { ICompetitionInfo, ICompetitionInfoForm } from "../../models/competitions.models";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { STRINGS } from "../../consts/strings.consts";
import { updateCompetitionSchema } from "../../form-schemas/competitions.schemas";
import { useRef } from "react";
import TextAlign from '@tiptap/extension-text-align';

import {
	MenuButtonBold,
	MenuButtonBulletedList, 
	MenuButtonImageUpload,
	MenuButtonItalic,
	MenuControlsContainer,
	MenuDivider,
	MenuSelectHeading,
	ResizableImage,
	RichTextEditor,
	MenuButtonAlignCenter,
	MenuButtonAlignLeft,
	MenuButtonAlignRight,
	type RichTextEditorRef,
} from "mui-tiptap";
import StarterKit from '@tiptap/starter-kit';
import { FilePicker } from "../input/FilePicker";
import FilesService from "../../services/files.service";
import { useUpdateCompetition } from "../../queries/competitions.queries";
import { Spinner } from "../Spinner";
import { ErrorMessage } from "../ErrorMessage";
import { Errors } from "../../consts/errors.consts";
import CompetitionsMappers from "../../mappers/competitions.mappers";
import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import classNames from "../../App.module.scss";
import { FormFieldsSeparator } from "./FormFieldsSeparator";
import { fileToBase64 } from "../../utils/competitions.utils";

const CompetitionStrings = STRINGS.Forms.Competition;

interface ICompetitionFormProps {
	competition: ICompetitionInfo;
}

const descriptionEditorMenuControls = <MenuControlsContainer>
	<MenuSelectHeading />
	<MenuDivider />
	<MenuButtonBold />
	<MenuButtonItalic />
	<MenuButtonBulletedList />
	<MenuButtonAlignLeft />
	<MenuButtonAlignCenter />
	<MenuButtonAlignRight />
	<MenuButtonImageUpload
		onUploadFiles={async (files) => {
			const base64Promises = files.map(async (file) => {
				const base64String = await fileToBase64(file);
				return { src: base64String };
			});

			return Promise.all(base64Promises);
		}}
	/>
</MenuControlsContainer>;

const textEditorMenuControls = <MenuControlsContainer>
	<MenuSelectHeading />
	<MenuDivider />
	<MenuButtonBold />
	<MenuButtonItalic />
	<MenuButtonBulletedList />
	<MenuButtonAlignLeft />
	<MenuButtonAlignCenter />
	<MenuButtonAlignRight />
</MenuControlsContainer>;

export function CompetitionForm(props: ICompetitionFormProps) {
	const { competition } = props;

	const rteRef = useRef<RichTextEditorRef>(null);
	const { handleSubmit, register, control, formState: { errors }, setValue } = useForm({
		resolver: yupResolver(updateCompetitionSchema)
	});

	const { data: updateCompetitionData, error: updateCompetitionError, mutateAsync: updateCompetitionMutateAsync, isPending: updateCompetitionIsPending } = useUpdateCompetition(competition.id);
	const errorCode: string | null = updateCompetitionData?.error?.code ?? (updateCompetitionError ? Errors.Generic : null);

	const fileUrl: string | null = competition?.privacyAttachmentId ? FilesService.getFileUrl(competition.privacyAttachmentId) : null;

	const onPrivacyAttachmentChange = (file: File | null) => {
		if (!file) {
			setValue('privacyAttachment', null);
			setValue('privacyAttachmentId', null);
		} else {
			setValue('privacyAttachment', file, { shouldValidate: true, shouldDirty: true });
		}
	}

	const onSubmit = async (formData: ICompetitionInfoForm): Promise<void> => {
		const data = CompetitionsMappers.ToIUpdateCompetitionRequest(competition.id, formData);
		await updateCompetitionMutateAsync(data);
	}

	return <Grid component="form"
		container
		spacing={2}
		className={classNames.competitionForm}
		onSubmit={handleSubmit(onSubmit)}>
		<TextField
			label={CompetitionStrings.Fields.Title}
			{...register("title")}
			className={classNames.fullWidth}
			error={!!errors.title}
			helperText={errors.title?.message}
			defaultValue={competition.title} />

		<div className={classNames.fullWidth}>
			<FormControl className={classNames.registrationsToggle}>
				<Controller
					name="registrationsOpen"
					defaultValue={competition.registrationsOpen}
					control={control}
					render={({ field }) => (
						<>
							<FormControlLabel
								label={CompetitionStrings.Fields.RegistrationsOpen}
								control={
									<Switch
										checked={field.value}
										onChange={(_, checked) => field.onChange(checked)}
									/>
								}
							/>

							{
								field.value
									? <Chip label={STRINGS.OpenPlural} color="success" />
									: <Chip label={STRINGS.ClosedPlural} color="error" />
							}
						</>
					)}
				/>
			</FormControl>
		</div>

		<div className={classNames.fullWidth}>
			<FormControl className={classNames.registrationsToggle}>
				<Controller
					name="rankingsVisible"
					defaultValue={competition.rankingsVisible}
					control={control}
					render={({ field }) => (
						<>
							<FormControlLabel
								label={CompetitionStrings.Fields.RankingsVisible}
								control={
									<Switch
										checked={field.value}
										onChange={(_, checked) => field.onChange(checked)}
									/>
								} />
						</>
					)}
				/>
			</FormControl>
		</div>

		<Controller
			name="date"
			control={control}
			defaultValue={competition.date}
			render={
				({ field }) => {
					const dayJsValue: Dayjs | null = field.value ? dayjs(field.value) : null;
					return (
						<div className={classNames.fullWidth}>
							<DateTimePicker
								label={CompetitionStrings.Fields.Date}
								value={dayJsValue}
								onChange={(newValue) => {
									field.onChange(newValue ? newValue.toDate() : null);
								}}
								slotProps={{
									textField: {
										error: !!errors.date,
										helperText: errors.date?.message as string | undefined,
										fullWidth: true
									}
								}}
								ampm={false}
								format={STRINGS.DateFormats.DateTime} />

							{errors.date && (
								<Typography variant="caption" color="error">
									{errors.date.message}
								</Typography>
							)}
						</div>
					)
				}} />

		<FormControl className={classNames.fullWidth}>
			<FormLabel>
				{CompetitionStrings.Fields.Description}
			</FormLabel>
			<Controller
				name="description"
				control={control}
				defaultValue={competition.description}
				render={({ field: { value, onChange } }) => (
					<>
						<RichTextEditor
							ref={rteRef}
							extensions={[
								StarterKit,
								TextAlign.configure({
									types: ['heading', 'paragraph'],
								}),
								ResizableImage.configure({ inline: true, allowBase64: true })]}
							className={`${classNames.fullWidth} ${classNames.textEditor}`}
							content={value}
							onUpdate={({ editor }) => {
								onChange(editor.getHTML())
							}}
							renderControls={() => (descriptionEditorMenuControls)} />
						{errors.description && (
							<Typography variant="caption" color="error">
								{errors.description.message}
							</Typography>
						)}
					</>
				)} />
		</FormControl>

		<FormFieldsSeparator
			title={CompetitionStrings.Separators.Email.Title}
			subtitle={CompetitionStrings.Separators.Email.Subtitle} />

		<TextField
			label={CompetitionStrings.Fields.EmailSubject}
			{...register("emailSubject")}
			className={classNames.fullWidth}
			error={!!errors.emailSubject}
			helperText={errors.emailSubject?.message}
			defaultValue={competition.emailSubject} />

		<FormControl className={classNames.fullWidth}>
			<FormLabel>
				{CompetitionStrings.Fields.EmailText}
			</FormLabel>
			<Controller
				name="emailText"
				control={control}
				defaultValue={competition.emailText}
				render={({ field: { value, onChange } }) => (
					<>
						<RichTextEditor
							ref={rteRef}
							extensions={[StarterKit,
								TextAlign.configure({
								types: ['heading', 'paragraph'],
							})]}
							content={value}
							className={`${classNames.fullWidth} ${classNames.textEditor}`}
							onUpdate={({ editor }) => {
								onChange(editor.getHTML())
							}}
						renderControls={() => (textEditorMenuControls)} />
						{errors.emailText && (
							<Typography variant="caption" color="error">
								{errors.emailText.message}
							</Typography>
						)}
					</>

				)} />
		</FormControl>

		<FormFieldsSeparator
			title={CompetitionStrings.Separators.Privacy.Title}
			subtitle={CompetitionStrings.Separators.Privacy.Subtitle} />

		<FormControl className={classNames.fullWidth}>
			<FormLabel>
				{CompetitionStrings.Fields.PrivacyText}
			</FormLabel>

			<Controller
				name="privacyAttachmentText"
				control={control}
				defaultValue={competition.privacyText}
				render={({ field: { value, onChange } }) => (
					<>
						<RichTextEditor
							ref={rteRef}
							extensions={[StarterKit, TextAlign.configure({
								types: ['heading', 'paragraph'],
							})]}
							content={value}
							className={`${classNames.fullWidth} ${classNames.textEditor}`}
							onUpdate={({ editor }) => {
								onChange(editor.getHTML())
							}}
							renderControls={() => (textEditorMenuControls)} />
						{errors.privacyAttachmentText && (
							<Typography variant="caption" color="error">
								{errors.privacyAttachmentText.message}
							</Typography>
						)}
					</>
				)} />
		</FormControl>

		<Controller
			name='privacyAttachment'
			control={control}
			render={({ field }) => {
				const filePreview = field?.value ? URL.createObjectURL(field.value) : null;
				return <div className={classNames.fullWidth}>
					<FilePicker
						fieldLabel={CompetitionStrings.Fields.PrivacyAttachment}
						fileUrl={filePreview ?? fileUrl}
						file={field?.value ?? null}
						onChange={onPrivacyAttachmentChange} />
				</div>
			}} />

		<Controller
			name="privacyAttachmentId"
			control={control}
			defaultValue={competition.privacyAttachmentId}
			render={({ field }) => (
				<input type="hidden" {...field} value={field.value ?? ''} />
			)}
		/>

		{
			updateCompetitionIsPending && <Spinner />
		}

		{
			errorCode &&
			<ErrorMessage errorCode={errorCode ?? ''} />
		}

		<div className={`${classNames.fullWidth} ${classNames.saveButtonContainer}`}>
			<Button type="submit" variant="contained">
				{STRINGS.Save}
			</Button>
		</div>
	</Grid>;
}