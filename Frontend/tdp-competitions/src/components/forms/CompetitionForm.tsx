import { Button, Chip, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Switch, TextField, Typography } from "@mui/material";
import type { ICompetitionInfo, ICompetitionInfoForm } from "../../models/competitions.models";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { STRINGS } from "../../consts/strings.consts";
import { updateCompetitionSchema } from "../../form-schemas/competitions.schemas";
import { useRef, useState } from "react";
import {
	MenuButtonBold,
	MenuButtonBulletedList,
	MenuButtonItalic,
	MenuControlsContainer,
	MenuDivider,
	MenuSelectHeading,
	RichTextEditor,
	type RichTextEditorRef,
} from "mui-tiptap";
import StarterKit from '@tiptap/starter-kit';
import { ImagePicker } from "../input/ImagePicker";
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
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationDialog from "../ConfirmationDialog";

const CompetitionStrings = STRINGS.Forms.Competition;

interface ICompetitionFormProps {
	competition: ICompetitionInfo;
}

const textEditorMenuControls = <MenuControlsContainer>
	<MenuSelectHeading />
	<MenuDivider />
	<MenuButtonBold />
	<MenuButtonItalic />
	<MenuButtonBulletedList />
</MenuControlsContainer>;

export function CompetitionForm(props: ICompetitionFormProps) {
	const { competition } = props;

	const rteRef = useRef<RichTextEditorRef>(null);
	const { handleSubmit, register, control, formState: { errors }, setValue } = useForm({
		resolver: yupResolver(updateCompetitionSchema)
	});

	const { data: updateCompetitionData, error: updateCompetitionError, mutateAsync: updateCompetitionMutateAsync, isPending: updateCompetitionIsPending } = useUpdateCompetition(competition.id);
	const errorCode: string | null = updateCompetitionData?.error?.code ?? (updateCompetitionError ? Errors.Generic : null);

	const [isDeleteBannerDialogOpen, setIsDeleteBannerDialogOpen] = useState<boolean>(false);
	const bannerImageUrl: string | null = competition?.bannerImageId ? FilesService.getFileUrl(competition.bannerImageId) : null;
	const fileUrl: string | null = competition?.privacyAttachmentId ? FilesService.getFileUrl(competition.privacyAttachmentId) : null;

	const onBannerImageChange = (file: File | null) => {
		if (!file) {
			setValue('bannerImage', null);
		} else {
			setValue('bannerImage', file, { shouldValidate: true, shouldDirty: true });
		}
	}

	const onPrivacyAttachmentChange = (file: File | null) => {
		if (!file) {
			setValue('privacyAttachment', null);
		} else {
			setValue('privacyAttachment', file, { shouldValidate: true, shouldDirty: true });
		}
	}

	console.log("errors", errors);
	const onSubmit = async (formData: ICompetitionInfoForm): Promise<void> => {
		console.log("on submit", formData);
		const data = CompetitionsMappers.ToIUpdateCompetitionRequest(competition.id, formData);
		await updateCompetitionMutateAsync(data);
	}

	return <Grid component="form"
		container
		spacing={2}
		className={classNames.competitionForm}
		onSubmit={handleSubmit((data) => onSubmit(data))}>
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

		<Controller
			name='bannerImage'
			control={control}
			render={({ field }) => {
				const previewImage = field?.value ? URL.createObjectURL(field.value) : null;

				return (
					<div className={`${classNames.fullWidth} ${classNames.bannerImage}`}>
						<div>
							<ImagePicker
								fieldLabel={CompetitionStrings.Fields.BannerImage}
								imageUrl={bannerImageUrl}
								image={field?.value ?? null}
								onChange={onBannerImageChange} />

							{errors.bannerImage && (
								<Typography variant="caption" color="error">
									{errors.bannerImage.message}
								</Typography>
							)}
						</div>


						{
							(previewImage || bannerImageUrl) &&
							<div className={classNames.preview} style={{
								backgroundImage: `url(${previewImage ?? bannerImageUrl})`
							}}>

								<IconButton
									onClick={() => setIsDeleteBannerDialogOpen(true)}
									className={classNames.deleteButton}
									color="primary"
									title={STRINGS.Delete}>
									<DeleteIcon />
								</IconButton>
							</div>
						}
					</div>
				)
			}} />

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
								format="DD/MM/YYYY HH:mm" />

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
							extensions={[StarterKit]}
							className={`${classNames.fullWidth} ${classNames.textEditor}`}
							content={value}
							onUpdate={({ editor }) => {
								onChange(editor.getHTML())
							}}
							renderControls={() => (textEditorMenuControls)} />
						{errors.description && (
							<Typography variant="caption" color="error">
								{errors.description.message}
							</Typography>
						)}
					</>
				)} />
		</FormControl>

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
							extensions={[StarterKit]}
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
							extensions={[StarterKit]}
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

		<ConfirmationDialog
			isOpen={isDeleteBannerDialogOpen}
			title={STRINGS.Dialogs.DeleteBannerImage.Title}
			cancelBtnLabel={STRINGS.Cancel}
			confirmBtnLabel={STRINGS.Delete}
			isLoading={false}
			error={null}
			content={STRINGS.Dialogs.DeleteBannerImage.Content}
			onCancel={() => { setIsDeleteBannerDialogOpen(false) }}
			onClose={() => { setIsDeleteBannerDialogOpen(false) }}
			onConfirm={() => {
				onBannerImageChange(null);
				setIsDeleteBannerDialogOpen(false);
			}} />
	</Grid>;
}