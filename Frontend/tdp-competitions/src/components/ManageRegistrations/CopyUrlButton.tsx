import { Alert, Button, Modal } from "@mui/material";
import { useRef, useState } from "react";
import LinkIcon from '@mui/icons-material/Link';
import CheckIcon from '@mui/icons-material/Check';
import { STRINGS } from "../../consts/strings.consts";
import { LinkUtils } from "../../utils/link.utils";
import classNames from "../../App.module.scss";
const FormString = STRINGS.Pages.EditorCompetitionPage.Actions;

interface ICopyUrlButtonProps {
	competitionSlug: string;
}

export function CopyUrlButton(props: ICopyUrlButtonProps) {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [alertVisible, setAlertVisible] = useState<boolean>(false);

	const textRef = useRef<HTMLParagraphElement>(null);
	const publicUrl: string = LinkUtils.SlugToPublicFormUrl(props.competitionSlug);

	const closeModal = () => {
		setModalOpen(false);
		setAlertVisible(false);
	}

	const onTextClick = async (): Promise<void> => {
		if (!textRef.current) {
			return;
		}

		setAlertVisible(false);

		const range = document.createRange();
		range.selectNodeContents(textRef.current);

		const selection = window.getSelection();
		selection?.removeAllRanges();
		selection?.addRange(range);

		try {
			await navigator.clipboard.writeText(publicUrl);
			selection?.removeAllRanges();
			setAlertVisible(true);
		} catch(e) {
			console.log(e);
		}
	}


	return <>
		<Button onClick={() => setModalOpen(true)} title={FormString.GetPublicUrl} variant="contained">
			<LinkIcon />&nbsp;{FormString.GetPublicUrl}
		</Button>
		<Modal open={modalOpen} onClose={closeModal}>
			<div className={classNames.modal} title={FormString.ClickToCopy}>
				<div className={classNames.copyUrl}
					ref={textRef}
					onClick={onTextClick}>
					<h5>{FormString.ClickToCopy}</h5>
					{publicUrl}
				</div>
				{
					alertVisible &&
					<Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
							{FormString.UrlCopied}
					</Alert>
				}
			</div>
		</Modal>
	</>
}