import { Modal } from "@mui/material";
import classNames from "../../App.module.scss";
import type { ReactNode } from "react";

export interface IBaseModalProps{
	title?: string;
	subtitle?: string;
	className?: string | undefined;
	open: boolean;
	onClose: () => void;
	children?: ReactNode;
}

export function BaseModal(props: IBaseModalProps) {
	return <Modal open={props.open} onClose={props.onClose} className={props.className}>
		<div className={classNames.modal}>
			<div className={classNames.modalHeader}>
				{
					props.title && <h2>{props.title}</h2>
				}
				{
					props.subtitle && <h3>{props.subtitle}</h3>
				}
			</div>
			<div className={classNames.modalBody}>
				{props.children}
			</div>
		</div>
	</Modal>;
}