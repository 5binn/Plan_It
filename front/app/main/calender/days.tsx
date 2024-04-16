import { format } from "date-fns"
import "../../styles.css"

export const CalenderDays = () => {

    const days = [];
    const date = ['월', '화', '수', '목', '금', '토', '일'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div key={i}>
                {date[i]}
            </div>
        )
    }

    return (
        <div className="weeks border">
            {days}
        </div>
    )
}