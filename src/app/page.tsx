"use client";
import { useState } from "react";
import { generateDate, months } from "./utils/calender";
import dayjs from "dayjs";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  console.log("dates are ", generateDate());
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [endTime, setEndTime] = useState<string | null>("00:00");
  const [value, setValue] = useState<string | null>("00:00");

  return (
    <div className="flex gap-10 sm:divide-x justify-center sm:w-1/2 mx-auto  h-screen items-center sm:flex-row flex-col">
      <div className="w-96 h-auto glasss  ">
        <div className="flex justify-between pt-2 px-2">
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
              const isSaturday = index % 7 === 6; // Saturday
              const isSunday = index % 7 === 0; // Sunday
              return (
                <div
                  key={`date-${index}`}
                  className={`h-14 border-t grid place-content-center text-md ${
                    isSaturday
                      ? " border-l border-white"
                      : isSunday
                      ? "border-r border-white"
                      : ""
                  }`}
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
      <div className="px-5 flex flex-col">
        <h1 className="font-semibold">
          Schedule for {selectDate.toDate().toDateString()}
        </h1>
        <p>No meetings for today.</p>
        <div className="font-semibold">
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-green-600">Add Events</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] bg-pink-900 glass">
              <DialogHeader>
                <DialogTitle>Add Event</DialogTitle>
                <DialogDescription>
                  You can add events from here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <h1 className="text-right">Event name</h1>
                  <input
                    id="name"
                    placeholder="Enter name of event"
                    className="col-span-3 border border-black rounded text-black"
                  />
                </div>
                {/* Start Time Picker */}
                <div className="my-2 w-full">
                  <label className="block">Start Time</label>
                  <TimePicker
                    value={endTime}
                    onChange={setEndTime}
                    format="hh:mm a" // 12-hour format with AM/PM
                    className="w-full p-2 border rounded"
                  />
                </div>
                {/* End Time Picker */}
                <div className="my-2">
                  <label className="block">End Time</label>
                  <TimePicker
                    value={endTime}
                    onChange={setEndTime}
                    format="hh:mm a" // 12-hour format with AM/PM
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              <DialogFooter>
                <button
                  type="submit"
                  className="bg-green-400 text-black text-md rounded p-2"
                >
                  Save changes
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
