import { STRINGS } from "../../../../consts/strings.consts";
import FilesService from "../../../../services/files.service";

interface IPrivacyTextProps {
	fileId?: string | null;
}


export function PrivacyText(props: IPrivacyTextProps) {
	const { fileId } = props;
	const fileLink = fileId ? FilesService.getFileUrl(fileId) : null;

	return <span>
		{STRINGS.Pages.RegistrationPage.AcceptPrivacy}
		{
			fileLink &&
			<>
				&nbsp;
				<a href={fileLink} target="_blank">{STRINGS.Pages.RegistrationPage.PrivacyLink}</a>
			</>
		}
	</span>
}