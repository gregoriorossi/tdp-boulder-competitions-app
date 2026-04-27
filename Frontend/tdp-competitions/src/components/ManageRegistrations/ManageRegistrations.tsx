import { Button } from "@mui/material";
import { ErrorMessage } from "../ErrorMessage";
import { Spinner } from "../Spinner";
import { RegistrationRow } from "./RegistrationRow";
import { sortRegistrations } from "../../utils/competitions.utils";
import classNames from "../../App.module.scss";
import { useRegistrationsByCompetitionsId } from "../../queries/registrations.queries";
import { STRINGS } from "../../consts/strings.consts";
import { RegistrationModal } from "../modals/RegistrationModal";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import ArticleIcon from '@mui/icons-material/Article';
const ManageRegistraionsStrings = STRINGS.Pages.EditorCompetitionPage.ManageRegistrations;

interface IManageRegistrationsProps {
	competitionId: string;
}

export function ManageRegistrations(props: IManageRegistrationsProps) {
	const { competitionId } = props;
	const { data: response, isLoading, error } = useRegistrationsByCompetitionsId(competitionId);
	const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState<boolean>(false);

	if (isLoading) {
		return <Spinner />;
	}

	if (error || response?.isFailure) {
		return <ErrorMessage errorCode={response?.error?.code ?? ''} />
	}

	return <div className={classNames.manageRegistrations}>
		<div className={classNames.actionsContainer}>
			<Button
				onClick={() => { }}
				variant="contained"
				endIcon={<ArticleIcon />}>
				{ManageRegistraionsStrings.PrintAll}
			</Button>&nbsp;
			<Button
				onClick={() => setIsRegistrationModalOpen(true)}
				variant="contained"
				endIcon={<AddIcon />}>
				{ManageRegistraionsStrings.NewRegistration}
			</Button>
		</div>

		<div className={classNames.table} role="table">
			<div className={`${classNames.row} ${classNames.header}`}>
				<div>{ManageRegistraionsStrings.Table.Name}</div>
				<div>{ManageRegistraionsStrings.Table.Email}</div>
				<div>{ManageRegistraionsStrings.Table.BirthDate}</div>
				<div>{ManageRegistraionsStrings.Table.Minors}</div>
			</div>

			{
				response?.value
					.sort(sortRegistrations)
					.map(r => <RegistrationRow registration={r} key={r.email} />)
			}
		</div>
		<RegistrationModal
			open={isRegistrationModalOpen}
			onAdded={() => { }}
			onUpdated={() => { }}
			competitionId={competitionId}
			onClose={() => setIsRegistrationModalOpen(false)} />
	</div>;
}