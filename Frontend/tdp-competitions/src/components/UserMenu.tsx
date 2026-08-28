import { LogoutOutlined } from "@mui/icons-material";
import { IconButton, Menu, ListSubheader, MenuItem, Button } from "@mui/material";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { Errors } from "../consts/errors.consts";
import { STRINGS } from "../consts/strings.consts";
import { useCompetitorLogout } from "../hooks/useCompetitorAuth";
import { useDeleteRegistration } from "../queries/competitors.queries";
import ConfirmationDialog from "./ConfirmationDialog";
import { Routes } from "../consts/routes.consts";

const PageStrings = STRINGS.Pages.CompetitorCompetitionPage;

interface IUserMenuProps {
	userEmail: string;
	competitionId: string;
	registrationId: string;
}

export function UserMenu(props: IUserMenuProps) {
	const { userEmail, competitionId, registrationId } = props
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [deleteRegistrationDialogOpen, setDeleteRegistrationDialogOpen] = useState<boolean>(false);
	const { error: deleteError, mutateAsync: deleteRegistrationAsync, isPending: isDeletePending } = useDeleteRegistration();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const { logout } = useCompetitorLogout();
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		logout();
	}

	const errorMessageStr: string | null = errorMessage ?? (deleteError ? Errors.Generic : null);

	const onDeleteRegistrationHandler = async (): Promise<void> => {
		try {
			const data = await deleteRegistrationAsync({
				competitionId: competitionId,
				registrationId: registrationId
			});
			if (data.isSuccess) {
				setErrorMessage(null);
				setDeleteRegistrationDialogOpen(false);
				navigate(Routes.CompetitorLogin);
				return;
			}
			setErrorMessage(data.error?.code ?? Errors.Generic);
		} catch (e) {
			console.log(e);
			setErrorMessage(Errors.Generic);
		}
	}

	return <div>
		<IconButton
			aria-controls={open ? 'user-menu' : undefined}
			aria-haspopup="true"
			aria-expanded={open}
			onClick={handleClick}>
			<MenuIcon />
		</IconButton>

		<Menu
			anchorEl={anchorEl}
			open={open}
			onClose={handleClose}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'left',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'left',
			}}>
			<ListSubheader>{userEmail}</ListSubheader>
			<MenuItem onClick={() => { }}> 
				<Button
					title={PageStrings.DeleteRegistration.ButtonText}
					variant="contained"
					color="error"
					startIcon={<DeleteIcon />}
					onClick={() => { setDeleteRegistrationDialogOpen(true) }}>
					{PageStrings.DeleteRegistration.ButtonText}
				</Button>
			</MenuItem>
			<MenuItem onClick={handleClose}>
				<Button
					variant="contained"
					color="error"
					startIcon={<LogoutOutlined />}
					onClick={handleLogout}>
					{STRINGS.Logout}
				</Button>
			</MenuItem>
		</Menu>

		<ConfirmationDialog
			isOpen={deleteRegistrationDialogOpen}
			title={PageStrings.DeleteRegistration.ConfirmationDialogTitle}
			cancelBtnLabel={STRINGS.Cancel}
			confirmBtnLabel={STRINGS.Delete}
			isLoading={isDeletePending}
			error={errorMessageStr}
			content={PageStrings.DeleteRegistration.ConfirmationDialogContent}
			onCancel={() => { setDeleteRegistrationDialogOpen(false) }}
			onClose={() => { setDeleteRegistrationDialogOpen(false) }}
			onConfirm={onDeleteRegistrationHandler} />
	</div>;
}