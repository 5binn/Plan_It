import { format } from "date-fns"
import "../../styles.css"


export const CalenderHeader = ({ currentMonth, preMonth, nextMonth }: any) => {
    return (
        <div className="calenderHeader row-auto font-bold text-lg drop-shadow">
            <button className="rounded-full m-2 hover:text-gray-500" onClick={preMonth}> ← </button>
            <div className="m-2">
                <span className=" m-1">
                    {format(currentMonth, 'yyyy')}년
                </span>
                <span className=" m-1">
                    {format(currentMonth, 'M')}월
                </span>
            </div>
            <button className="rounded-full m-2 hover:text-gray-500" onClick={nextMonth}> → </button>
        </div>
    )
}