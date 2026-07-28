import { Button } from "@mui/material";
import { RegistrationRow } from "./RegistrationRow";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import { ErrorMessage } from "../../../../../components/ErrorMessage";
import { RegistrationModal } from "../../../../../components/modals/RegistrationModal";
import { Spinner } from "../../../../../components/Spinner";
import { STRINGS } from "../../../../../consts/strings.consts";
import { useRegistrationsByCompetitionsId } from "../../../../../queries/registrations.queries";
import { sortRegistrations } from "../../../../../utils/competitions.utils";
import { EditorsEndpoints } from "../../../../../api/endpoints";
import classNames from "../../../../../App.module.scss";
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
				onClick={() => {
					const url: string = EditorsEndpoints.downloadReport(competitionId);
					window.open(url, "_blank");
				}}
				variant="contained"
				endIcon={<DownloadIcon />}>
				{ManageRegistraionsStrings.DownloadReport}
			</Button>&nbsp;
			<Button
				onClick={() => {
					const url: string = EditorsEndpoints.downloadWaiverAll(competitionId);
					window.open(url, "_blank");
				}}
				variant="contained"
				endIcon={<PrintIcon />}>
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