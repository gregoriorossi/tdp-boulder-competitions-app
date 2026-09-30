import logoTesteDiPietra from '../assets/teste-di-pietra_logo.png';
import classNames from "../App.module.scss";
import { ErrorMessage } from '../components/ErrorMessage';

interface IErrorPageProps {
    errorCode: string;
}
export function ErrorPage(props: IErrorPageProps) {
    const { errorCode } = props;
    return (
        <div>
            <div className={classNames.header}>
                <img src={logoTesteDiPietra} className={classNames.logo} />
            </div>
            <ErrorMessage errorCode={errorCode} />
        </div>
    );
}