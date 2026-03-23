import { ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import classNames from "../../App.module.scss";
import type { IProblemsGroup } from "../../models/competitions.models";
import { getBorderColor } from "../../utils/problems.utils";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { STRINGS } from "../../consts/strings.consts";
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationDialog from "../ConfirmationDialog";
import { useState } from "react";

interface IEditProblemsGroupProps {
	group: IProblemsGroup;
	onMove: (formIndex: number, toIndex: number) => void;
	onDelete: (group: IProblemsGroup) => void;
	isFirst: boolean;
	isLast: boolean;
}

export function EditProblemsGroup(props: IEditProblemsGroupProps) {
	const { group, isFirst, isLast, onMove, onDelete } = props;
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);


	const borderColor = getBorderColor(group.colorCode);
	const style = {
		backgroundColor: group.colorCode,
		borderColor: borderColor
	};


	return <ListItem key={group.id} className={classNames.group}>
		<span
			className={classNames.square}
			style={style}>
		</span>
		<div className={classNames.actions}>
			{
				!isFirst &&
				<ListItemButton onClick={() => onMove(group.order, group.order - 1)}
					title={STRINGS.MoveUp}>
					<ListItemIcon className={classNames.actionIcon}>
						<ArrowUpwardIcon />
					</ListItemIcon>

				</ListItemButton>
			}
			{
				!isLast &&
				<ListItemButton onClick={() => onMove(group.order, group.order + 1)}
					title={STRINGS.MoveDown}>
					<ListItemIcon className={classNames.actionIcon}>
						<ArrowDownwardIcon />
					</ListItemIcon>
				</ListItemButton>
			}

			<ListItemButton onClick={() => setIsDeleteDialogOpen(true)}
				title={STRINGS.Delete}>
				<ListItemIcon className={classNames.actionIcon}>
					<DeleteIcon />
				</ListItemIcon>
			</ListItemButton>
		</div>

		<ConfirmationDialog
			isOpen={isDeleteDialogOpen}
			title={STRINGS.Dialogs.DeleteProblemsGroup.Title}
			cancelBtnLabel={STRINGS.Cancel}
			confirmBtnLabel={STRINGS.Delete}
			isLoading={false}
			error={null}
			content={STRINGS.Dialogs.DeleteProblemsGroup.Content}
			onCancel={() => { setIsDeleteDialogOpen(false) }}
			onClose={() => { setIsDeleteDialogOpen(false) }}
			onConfirm={() => onDelete(group)} />
	
	</ListItem>
}