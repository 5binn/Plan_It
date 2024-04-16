import { addDays, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, parse, startOfMonth, startOfWeek } from "date-fns"
import "../../styles.css"

export const CalenderBody = ({ currentMonth, selectedDate }: any) => {

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'dd');
            days.push(
                <div className={`days border ${
                        !isSameMonth(day, monthStart)
                            ? 'disabled'
                            : isSameDay(day, selectedDate)
                            ? 'font-bold text-lg'
                            : format(currentMonth, 'M') !== format(day, 'M')
                    }`}
                    key={day}
                    // onClick={onDateClick()}
                >
                    <span
                        className={`m-3 ${ format(currentMonth, 'M') !== format(day, 'M')
                        ? 'text not-valid'
                        : ''}`
                           
                        }
                    >
                        {formattedDate}
                    </span>
                </div>,
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="weeks " key={day}>
                 {days}
            </div>,
        );
        days = [];
    }
    return <div className="body border">{rows}</div>;
}