import classNames from "../../../../App.module.scss";
import type { ICompetition } from "../../../../models/competitors.models";
import { DateUtils } from "../../../../utils/date.utils";

export interface IInfoProps {
    competition: ICompetition;
}

export function Info(props: IInfoProps) {
    const { competition } = props;

    return <div className={classNames.info}>
        <div className={classNames.date}>
            <span><b>{DateUtils.ToDateTime(competition.date)}</b></span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: competition.description }}></div>
    </div>;
}