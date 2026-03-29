import { Box, Button, ButtonGroup, Collapse, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import type { IRegistration } from "../../models/competitions.models";
import { BuildFullName } from "../../utils/competitions.utils";
import { DateUtils } from "../../utils/date.utils";

import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { STRINGS } from "../../consts/strings.consts";
import { MinorRow } from "./MinorRow";
import classNames from "../../App.module.scss";

interface IRegistrationRowProps {
	registration: IRegistration;
}

export function RegistrationRow(props: IRegistrationRowProps) {
	const { registration } = props;
	const [isOpen, setIsOpen] = useState<boolean>(true);
	const fullName: string = BuildFullName(registration.competitor);
	const hasMinors: boolean = registration.minors.length > 0;

	return <>
		<TableRow className={`${classNames.registrationRow} ${hasMinors ? classNames.hasMinors : ''}`}
			onClick={() => setIsOpen(!isOpen)}>
			<TableCell>{fullName}</TableCell>
			<TableCell>{registration.email}</TableCell>
			<TableCell>{DateUtils.ToDateOnly(registration.competitor.birthDate)}</TableCell>
			<TableCell>{hasMinors ? registration.minors.length : "No"}</TableCell>
			<TableCell>
				<ButtonGroup variant="contained">
					<Button title="Dettagli"><CreateIcon /></Button>
					<Button title={STRINGS.Delete}>
						<DeleteIcon />
					</Button>
				</ButtonGroup>
			</TableCell>
		</TableRow>

		{
			hasMinors &&
			<Collapse in={isOpen} unmountOnExit>
				<TableRow>
					<TableCell>

						<Box>
							{
								registration.minors
									.map((m, idx) => <MinorRow competitor={m} key={`${idx}-${m.lastName}-${m.firstName}`} />)
							}
						</Box>
					</TableCell>
				</TableRow>
			</Collapse>
		}
	</>;
}