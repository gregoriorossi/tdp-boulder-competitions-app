import classNames from "../../../../App.module.scss";
import { STRINGS } from "../../../../consts/strings.consts";
import FilesService from "../../../../services/files.service";

interface IPrivacyTextProps {
	fileId?: string | null;
	privacyText: string;
}


export function PrivacyText(props: IPrivacyTextProps) {
	const { fileId, privacyText } = props;
	const fileLink = fileId ? FilesService.getFileUrl(fileId) : null;

	return <div className={classNames.privacyText}>
		<span dangerouslySetInnerHTML={{ __html: privacyText ?? STRINGS.Pages.RegistrationPage.AcceptPrivacy }}></span>
		{
			fileLink &&
			<>
				&nbsp;
				<a href={fileLink} target="_blank">{STRINGS.Pages.RegistrationPage.PrivacyLink}</a>
			</>
		}
	</div>
}