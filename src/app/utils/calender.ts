import dayjs from "dayjs";

export const generateDate = (month = dayjs().month(), year = dayjs().year()) =>{
     
    const firstDateofMonth = dayjs().year(year).month(month).startOf("month");
    const lastDateofMonth = dayjs().year(year).month(month).endOf("month");
    const arrayofDate = [];
    for (let i: any=firstDateofMonth.date(); i<=lastDateofMonth.date() ; i++){
        arrayofDate.push(firstDateofMonth.date(i));
    }
    return arrayofDate;


}


