import { IconButton } from "@mui/material";
import classNames from "../../App.module.scss";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import type { ISpecialProblem } from "../../models/competitions.models"
import { STRINGS } from "../../consts/strings.consts";

interface ISpecialProblemProps {
	problem: ISpecialProblem;
}

export function SpecialProblem(props: ISpecialProblemProps) {
	return <div className={classNames.specialProblem }> 
		{props.problem.name}&nbsp;
		<IconButton
			onClick={() => { }}
			color="primary"
			title={STRINGS.Edit}>
			<CreateIcon />
		</IconButton>
		<IconButton
			onClick={() => { }}
			color="primary"
			title={STRINGS.Delete}>
			<DeleteIcon />
		</IconButton>
	</div>
}