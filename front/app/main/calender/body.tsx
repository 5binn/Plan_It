import { addDays, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, isWithinInterval, parse, startOfMonth, startOfWeek, subDays } from "date-fns"
import "../../styles.css"
import { Curriculum } from "@/app/util/type";

export const CalenderBody = ({ onDateClick, currentMonth, selectedDate, curriculums }: any) => {

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const formatDate = (date: any) => {
        return format(new Date(date), 'yy-MM-dd');
    }

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'dd');
            days.push(
                <div className={`days border ${!isSameMonth(day, monthStart)
                    ? 'disabled'
                    : isSameDay(day, selectedDate)
                        ? 'font-bold'
                        : format(currentMonth, 'M') !== format(day, 'M')
                    }`}
                    key={day}>
                    <span onClick={() => onDateClick(day)}
                        className={`m-3 ${format(currentMonth, 'M') !== format(day, 'M')
                            ? 'text not-valid'
                            : ''}`
                        }>
                        {formattedDate}

                    </span>
                    <div className="daycontainer mt-1 ml-1 text-sm">
                    {curriculums.map((curriculum: Curriculum) => (
                        isWithinInterval(day, { start: subDays(new Date(curriculum.startDate), 1), end: new Date(curriculum.endDate) }) &&
                        <span className="calcuri truncate border rounded mt-1 ml-1 pl-1" key={curriculum.id}>{curriculum.name}</span>
                    ))}
                    </div>
                </div>,
            );
            day = addDays(day, 1);
        }
        console.log(formatDate(day))
        rows.push(
            <div className="weeks " key={day}>
                {days}
            </div>,
        );
        days = [];
    }
    return <div className="body border">{rows}</div>;
}