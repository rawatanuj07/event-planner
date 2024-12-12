import dayjs from "dayjs";

export const generateDate = (month = dayjs().month(), year = dayjs().year()) =>{
     
    const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
    const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");
    const arrayOfDate = [];

    // generate prvious month dates
    // unshift(): Adds these dates at the start of the array in reverse order 
    // so they appear before the first day of the month in the calendar grid.
    for (let i = 0; i < firstDateOfMonth.day(); i++) {
        const date = firstDateOfMonth.subtract(i + 1, "day");    
        arrayOfDate.unshift({date: date, currentMonth: false});
    }

    // generate current month dates
    for (let i: any=firstDateOfMonth.date(); i<=lastDateOfMonth.date() ; i++){
        arrayOfDate.push({date: firstDateOfMonth.date(i), currentMonth: true, today: firstDateOfMonth.date(i).toDate().toDateString()===dayjs().toDate().toDateString()
        });
    }

    //generate rest of the dates
	const remaining = 42 - arrayOfDate.length;

    for (let i: any = lastDateOfMonth.date()+1; i<=lastDateOfMonth.date()+remaining; i++){
        arrayOfDate.push({date: lastDateOfMonth.date(i), currentMonth: false});

    }
    return arrayOfDate;


}


