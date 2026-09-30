import { DateUtils } from "../utils/date.utils";

export interface IDateFormatterProps {
    dateStr: string;
}

export default function DateFormatter(props: IDateFormatterProps) {
    const { dateStr } = props;

    const date: Date = DateUtils.StringToDate(dateStr);
    const dateFormatted = DateUtils.ToDateOnly(date);

    return <span>
        {dateFormatted}
    </span>;
}