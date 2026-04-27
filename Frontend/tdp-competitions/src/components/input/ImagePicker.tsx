import { Button, Typography } from "@mui/material";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useState, type ChangeEvent } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { STRINGS } from "../../consts/strings.consts";
import classNames from "../../App.module.scss";

interface IImagePickerProps {
	fieldLabel: string;
	image: File | null;
	imageUrl: string | null;
	onChange: (file: File | null) => void;
}

export function ImagePicker(props: IImagePickerProps) {
	const [selectedImagePreview, setSelectedImagePreview] = useState<string | null>(null);

	const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const file = e.target?.files?.[0] ?? null;
		if (file) {
			const previewImage = URL.createObjectURL(file);
			setSelectedImagePreview(previewImage);
		}
		props.onChange(file);
	}

	return <div className={classNames.imagePicker}>
		<div className={classNames.actions}>
			<div>
				<Button
					variant="contained"
					startIcon={<PhotoCameraIcon />}
					component="label">
					{props.fieldLabel}
					<input
						hidden
						type="file"
						accept="image/*"
						onChange={onChange} />
				</Button>
				<div>
					<Typography variant="caption" color="text.secondary">
						{STRINGS.SupportedImageFormats}
					</Typography>
				</div>
			</div>
			{
				props.imageUrl &&
				<div className={classNames.deleteButtonContainer}>
					<Button variant="text"
						color="inherit"
						onClick={() => props.onChange(null)}>
						<DeleteIcon />&nbsp;
						{STRINGS.Delete}
					</Button>
				</div>
			}
		</div>		
	</div>;
}