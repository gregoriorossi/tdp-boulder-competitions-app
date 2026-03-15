import { CircularProgress } from "@mui/material";
import classNames from "../App.module.scss";

export function Spinner() {
	return <div className={classNames.horizontallyCentered}>
		<CircularProgress />
	</div>
}