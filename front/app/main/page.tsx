'use client'

import { addMonths, subMonths } from "date-fns";
import { useState } from "react"
import { CalenderHeader } from "./calender/header";
import { CalenderDays } from "./calender/days";
import { CalenderBody } from "./calender/body";


export default function Main() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [seletcedDate, setSelectedDate] = useState(new Date());

    const preMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const onDateClick = (day: any) => {
        setSelectedDate(day);
    };
    return (
        <div className="m-3 w-full">
            <CalenderHeader currentMonth={currentMonth} preMonth={preMonth} nextMonth={nextMonth} />
            <CalenderDays />
            <CalenderBody currentMonth={currentMonth} selectedDate={seletcedDate} onDateClick={onDateClick} />
        </div>
    )
}

