import { LogoutOutlined } from "@mui/icons-material";
import { IconButton, Menu, ListSubheader, MenuItem, Button } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { STRINGS } from "../consts/strings.consts";
import { useEditorLogout } from "../hooks/useEditorsAuth";

interface IEditorsMenuProps {
	userEmail: string;
}

export function EditorsMenu(props: IEditorsMenuProps) {
	const { userEmail } = props;
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const { logout } = useEditorLogout();
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		logout();
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
	</div>;
}