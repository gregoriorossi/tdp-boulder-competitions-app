import { Backdrop, CircularProgress } from "@mui/material";
import classNames from "../App.module.scss";

interface ISpinnerProps {
	backdrop?: boolean;
}
export function Spinner(props: ISpinnerProps) {
	const { backdrop } = props;

	if (backdrop) {
		return <Backdrop
			open={true}
			sx={{
				color: '#fff',
				zIndex: (theme) => theme.zIndex.drawer + 1,
			}}>
			<CircularProgress />
		</Backdrop>
	} 

	return <div className={classNames.horizontallyCentered}>
		<CircularProgress />
	</div>
}