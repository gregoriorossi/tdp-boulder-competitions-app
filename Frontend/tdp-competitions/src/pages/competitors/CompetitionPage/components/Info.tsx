import classNames from "../../../../App.module.scss";
import type { ICompetitionInfo } from "../../../../models/competitions.models";
import FilesService from "../../../../services/files.service";
import { DateUtils } from "../../../../utils/date.utils";

export interface IInfoProps {
    competition: ICompetitionInfo;
}

export function Info(props: IInfoProps) {
    const { competition } = props;
    const bannerImageUrl: string | null = competition?.bannerImageId ? FilesService.getFileUrl(competition.bannerImageId) : null;

    return <div className={classNames.info}>
        {
            bannerImageUrl &&
            <div className={classNames.bannerImage} style={{
                backgroundImage: `url(${bannerImageUrl})`
            }}>
            </div>
        }
        <div className={classNames.date}>
            <span><b>Quando:</b> {DateUtils.ToDateTime(competition.date)}</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: competition.description }}></div>
    </div>;
}