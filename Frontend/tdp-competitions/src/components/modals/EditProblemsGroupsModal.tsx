import { STRINGS } from "../../consts/strings.consts";
import type { IProblemsGroup } from "../../models/competitions.models";
import { BaseModal, type IBaseModalProps } from "./BaseModal";
import { Box, Button, List } from "@mui/material";
import classNames from "../../App.module.scss";
import { sortProblemsGroups } from "../../utils/problems.utils";
import { EditProblemsGroup } from "../ManageProblems/EditProblemsGroup";
import { useState } from "react";
import { useUpdateGroups } from "../../queries/competitions.queries";
import { Spinner } from "../Spinner";
import { ErrorMessage } from "../ErrorMessage";
import { Errors } from "../../consts/errors.consts";
import { AddProblemGroup } from "../ManageProblems/AddProblemGroup";

const FormStrings = STRINGS.Modals.EditProblemsGroups;

interface IEditProblemsGroupsModalProps extends IBaseModalProps {
	groups: IProblemsGroup[];
	competitionId: string;
}

export function EditProblemsGroupsModal(props: IEditProblemsGroupsModalProps) {
	const { open, onClose, competitionId } = props;
	const [groups, setGroups] = useState<IProblemsGroup[]>(props.groups);
	const { data: updateResponse, error: updateError, isPending: updateIsPending, mutateAsync: updateMutateAsync, reset: updateReset } = useUpdateGroups(competitionId);

	const onGroupMoved = (fromIndex: number, toIndex: number): void => {
		const newGroups = [...groups];
		newGroups[toIndex] = groups[fromIndex];
		newGroups[fromIndex] = groups[toIndex];

		const sortedGroups = newGroups.map((g, idx) => ({ ...g, order: idx }));
		setGroups(sortedGroups);
	}

	const onDeleted = (group: IProblemsGroup): void => {
		const newGroups = groups
			.filter(g => g.id !== group.id)
			.map((g, idx) => ({ ...g, order: idx }));
		setGroups(newGroups);
	}

	const onModalClose = () => {
		setGroups(props.groups);
		onClose();
		updateReset();
	}

	const onAdd = (group: IProblemsGroup): void => {
		setGroups([...groups, group]);
	}

	const onSave = async () => {
		try {
			const data = await updateMutateAsync(groups);
			if (data.isSuccess) {
				onClose();
				updateReset();
			}
		} catch (e) {
			console.log(e);
		}
	}

	const errorCode: string | null = updateResponse?.error?.code ?? (updateError ? Errors.Generic : null);

	return <BaseModal
		title={FormStrings.Title}
		className={classNames.editProblemsGroupsModal}
		open={open}
		onClose={onModalClose}>

		<AddProblemGroup
			competitionId={competitionId}
			onAdd={onAdd}
			order={groups.length}
			selectedGroups={groups} />

		<Box className={classNames.form}>
			<List className={classNames.groupsList}>
				{groups
					.sort(sortProblemsGroups)
					.map((g, idx) =>
						<EditProblemsGroup
							group={g}
							key={g.id}
							isFirst={idx === 0}
							onMove={onGroupMoved}
							onDelete={onDeleted}
							isLast={groups.length - 1 === idx} />)
				}
			</List>

			{
				updateIsPending && <Spinner />
			}

			{
				((errorCode ?? "").length > 0) &&
				<ErrorMessage errorCode={errorCode ?? ''} />
			}

			<Button type="submit" variant="contained" onClick={onSave}>
				{STRINGS.Save}
			</Button>
		</Box>
	</BaseModal>;
}