import classNames from "../../App.module.scss";
import { STRINGS } from "../../consts/strings.consts";
import type { IRegistration } from "../../models/competitions.models";
import { BuildFullName } from "../../utils/competitions.utils";
import { RegistrationForm } from "../forms/RegistrationForm";
import { BaseModal, type IBaseModalProps } from "./BaseModal";
const FormStrings = STRINGS.Forms.Registration;
interface IRegistrationModalProps extends IBaseModalProps {
	registration?: IRegistration;
	competitionId: string;
	open: boolean;
	onAdded: (registration: IRegistration) => void;
	onUpdated: (registration: IRegistration) => void;
}

export function RegistrationModal(props: IRegistrationModalProps) {
	const { open, onClose, registration, competitionId } = props;
	const fullName: string = registration ? BuildFullName(registration.competitor) : '';
	const formTitle: string = registration ? FormStrings.TitleEdit(fullName) : FormStrings.TitleNew;

	return <BaseModal
		title={formTitle}
		className={classNames.registrationModal}
		open={open}
		onClose={onClose}>
		<RegistrationForm
			registration={registration}
			competitionId={competitionId}
			onChange={() => onClose()} />
	</BaseModal>;
}