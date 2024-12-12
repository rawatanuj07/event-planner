"use client";
import { useState } from "react";
import { generateDate, months } from "./utils/calender";
import dayjs from "dayjs";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
export default function Home() {
  console.log("dates are ", generateDate());
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  console.log("today", currentDate);
  return (
    <div className="flex gap-10 sm:divide-x justify-center sm:w-1/2 mx-auto  h-screen items-center sm:flex-row flex-col">
      <div className="w-96 h-96 ">
        <div className="flex justify-between">
          <h1>
            {months[today.month()]}, {today.year()}
          </h1>
          <div className="flex items-center  gap-5">
            <GrFormPrevious
              className="cursor-pointer h-5 w-5"
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />
            <h1
              className="cursor-pointer"
              onClick={() => {
                setToday(currentDate);
              }}
            >
              Today
            </h1>
            <GrFormNext
              className="cursor-pointer h-5 w-5"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-7">
          {days.map((day, index) => {
            return (
              <h1
                key={`day-${index}`}
                className="h-14 grid place-content-center"
              >
                {day}
              </h1>
            );
          })}
        </div>
        <div className="w-full grid grid-cols-7">
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => {
              return (
                <div
                  key={`date-${index}`}
                  className="h-14 border-t grid place-content-center text-md"
                >
                  <h1
                    className={`${
                      currentMonth ? "" : "text-gray-500 text-sm"
                    } ${today ? "bg-red-600 text-white" : ""} ${
                      selectDate.toDate().toDateString() ===
                      date.toDate().toDateString()
                        ? "bg-blue-500 text-white"
                        : ""
                    } h-10 w-10 grid place-content-center rounded-full hover:bg-blue-600 hover:text-black transition-all hover:cursor-pointer`}
                    onClick={() => {
                      setSelectDate(date);
                    }}
                  >
                    {date.date()}
                  </h1>
                </div>
              );
            }
          )}
        </div>
      </div>
      <div className="px-5">
        <h1 className="font-semibold">
          Schedule for {selectDate.toDate().toDateString()}
        </h1>
        <p>No meetings for today.</p>
      </div>
    </div>
  );
}
