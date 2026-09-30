import { Alert, Checkbox, Snackbar } from "@mui/material";
import { DateUtils } from "../../../../../../utils/date.utils";
import { SendSpecialProblemModal } from "./SendSpecialProblemModal";
import React from "react";
import { useUnsendSpecialProblem } from "../../../../../../queries/editors.queries";
import { STRINGS } from "../../../../../../consts/strings.consts";
import classNames from "../../../../../../App.module.scss";

interface ISpecialProblemCellProps {
	sent: boolean;
	sentAt: string | undefined;
	competitorId: string;
	competitionId: string;
	specialProblemId: string;
	sentSpecialProblemId?: string;
}

export function SpecialProblemCell(props: ISpecialProblemCellProps) {
	const { sent, sentAt, competitorId, competitionId, specialProblemId, sentSpecialProblemId } = props;
	const date: Date | undefined = sentAt ? DateUtils.StringToDate(sentAt) : undefined;
	const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
	const { mutateAsync: unsendSpecialProblemAsync, } = useUnsendSpecialProblem(competitionId);
	const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false);

	const handleCheckboxChange = async (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
		if (checked) {
			setIsModalOpen(true);
		} else {
			if (sentSpecialProblemId) {
				try {
					await unsendSpecialProblemAsync({
						competitionId,
						sentSpecialProblemId,
						specialProblemId
					});
				} catch {
					setSnackbarOpen(true);
				}
			}
		}
	};

	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};

	return <div className={classNames.specialProblemCell}>
		<Checkbox
			checked={sent}
			onChange={handleCheckboxChange} />

		{
			sentAt && date &&
			<div>
				{DateUtils.ToDateTime(date)}
			</div>
		}

		<SendSpecialProblemModal
			open={isModalOpen}
			onClose={() => setIsModalOpen(false)}
			competitionId={competitionId}
			competitorId={competitorId}
			specialProblemId={specialProblemId}
			onSend={() => { setIsModalOpen(false); }} />

		{
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={5000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
				<Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
					{STRINGS.Errors.Generic}
				</Alert>
			</Snackbar>
		}
	</div>;
}