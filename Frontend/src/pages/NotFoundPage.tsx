import logoTesteDiPietra from '../assets/teste-di-pietra_logo.png';
import classNames from "../App.module.scss";
import { ErrorMessage } from '../components/ErrorMessage';
import { Errors } from '../consts/errors.consts';
export function NotFoundPage() {
    return (
        <div>
            <div className={classNames.header}>
                <img src={logoTesteDiPietra} className={classNames.logo} />
            </div>
            <ErrorMessage errorCode={Errors.Pages.NotFound} />
        </div>
    );
}