import { Box, Button } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { STRINGS } from "../../consts/strings.consts";
import classNames from "../../App.module.scss";

interface IFilePickerProps {
	fieldLabel: string;
	file: File | null;
	fileUrl: string | null;
	onChange: (file: File | null) => void;
}

export function FilePicker(props: IFilePickerProps) {
	return <Box component="div" className={classNames.filesPicker}>
		<div>
			<Button
				variant="contained"
				startIcon={<UploadFileIcon />}
				component="label">
				{props.fieldLabel}
				<input
					hidden
					type="file"
					accept="*"
					onChange={(e) => {
						const file = e.target?.files?.[0] ?? null;
						props.onChange(file);
					}}
				/>
			</Button>
		</div>
		{
			props.fileUrl &&
			<>
				<div className={classNames.deleteButtonContainer}>
					<a href={(props.fileUrl)!} target="_blank">
						{STRINGS.Document}
					</a>&nbsp;
					<Button variant="text"
						color="inherit"
						onClick={() => props.onChange(null)}>
						<DeleteIcon />&nbsp;
						{STRINGS.Delete}
					</Button>
				</div>
			</>

		}
	</Box>
} 