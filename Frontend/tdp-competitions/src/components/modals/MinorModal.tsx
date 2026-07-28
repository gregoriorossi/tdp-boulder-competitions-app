import classNames from "../../App.module.scss";
import { STRINGS } from "../../consts/strings.consts";
import type { ICompetitor } from "../../models/competitions.models";
import { BuildFullName } from "../../utils/competitions.utils";
import { MinorForm } from "../forms/MinorForm";
import { BaseModal, type IBaseModalProps } from "./BaseModal";
const FormStrings = STRINGS.Forms.Minor;

interface IMinorModalProps extends IBaseModalProps {
	minor?: ICompetitor;
	competitionId: string;
	registrationId: string;
	open: boolean;
	onChange: (minor: ICompetitor) => void;
}

export function MinorModal(props: IMinorModalProps) {
	const { open, onClose, onChange, minor, competitionId, registrationId } = props;

	const fullName: string = minor ? BuildFullName(minor) : '';
	const formTitle: string = minor ? FormStrings.TitleEdit(fullName) : FormStrings.TitleNew;

	return <BaseModal
		title={formTitle}
		className={classNames.registrationModal}
		open={open}
		onClose={onClose}>
		<MinorForm
			minor={minor}
			competitionId={competitionId}
			registrationId={registrationId}
			onChange={onChange} />
	</BaseModal>;
}