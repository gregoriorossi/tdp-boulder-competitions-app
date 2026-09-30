import classNames from "../../../../../../App.module.scss";
import { BaseModal, type IBaseModalProps } from "../../../../../../components/modals/BaseModal";
import { STRINGS } from "../../../../../../consts/strings.consts";
import type { IGetResultsSpecialProblem } from "../../../../../../models/competitions.models";
import { DateUtils } from "../../../../../../utils/date.utils";

const FormStrings = STRINGS.Modals.SpecialProblemHeader;

interface ISpecialProblemHeaderModalProps extends IBaseModalProps {
	specialProblem: IGetResultsSpecialProblem;
}

export function SpecialProblemHeaderModal(props: ISpecialProblemHeaderModalProps) {
    const { open, onClose, specialProblem } = props;
	return <BaseModal
		title={FormStrings.Title}
		className={classNames.specialProblemHeaderModal}
		open={open}
		onClose={onClose}>

		<div>
			<h3>{specialProblem.name}</h3>
			{
				specialProblem.sentBy.map((s) => {
					const date = new Date(s.sentAt);	

					return <div key={s.id} className={classNames.row} >
						<span>
							{s.firstName}&nbsp;{s.lastName}
						</span>
						<span>
							{DateUtils.ToDateTime(date)}
						</span>
					</div>
				})
			}
		</div>
	</BaseModal>;
}