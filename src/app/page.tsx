"use client";
import { useState } from "react";
import { generateDate, months } from "./utils/calender";
import dayjs from "dayjs";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { saveEvent } from "./utils/eventsave";

export default function Home() {
  console.log("dates are ", generateDate());
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [startTime, setStartTime] = useState<string | null>("00:00");
  const [endTime, setEndTime] = useState<string | null>("00:00");
  const [description, setDescription] = useState(""); // State for description
  const [isDialogOpen, setIsDialogOpen] = useState(false); // New state for controlling the dialog visibility
  const [name, setName] = useState("");
  interface Event {
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    date: string;
  }
  const [events, setEvents] = useState<Event[]>([]);

  const handleDateClick = (date: dayjs.Dayjs) => {
    setSelectDate(date); // Set the selected date
    // Get stored events from localStorage
    const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");

    // Format the selected date to match the format stored in the events
    const formattedDate = date.format("ddd MMM DD YYYY");

    // Filter events based on the formatted date
    const filteredEvents = storedEvents.filter(
      (event: Event) => event.date === formattedDate
    );

    setEvents(filteredEvents); // Set filtered events to display
  };
  // Function to handle double-click (to open modal)
  const handleDateDoubleClick = (date: dayjs.Dayjs) => {
    setSelectDate(date); // Set the selected date
    setIsDialogOpen(true); // Open the dialog modal
  };
  // Save event data to localStorage
  const save = () => {
    setIsDialogOpen(false);
    saveEvent(
      name,
      description,
      startTime,
      endTime,
      selectDate,
      setIsDialogOpen
    );
  }; // Use the imported function

  return (
    <div className="flex gap-10 sm:divide-x justify-center sm:w-1/2 mx-auto  h-screen items-center sm:flex-row flex-col">
      <div className="w-96 h-auto glasss  ">
        <h1 className="text-center p-2">
          Double-Click on any date to add an event.
        </h1>

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
                    onClick={() => handleDateClick(date)}
                    onDoubleClick={() => handleDateDoubleClick(date)}
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
        {/* Displayinng events for the selected date */}
        {events.length === 0 ? (
          <p>No meetings for today.</p>
        ) : (
          <div>
            {events.map((event, index) => (
              <div key={index} className="my-2 p-2 border-b">
                <h3 className="font-semibold">Event name: {event.name}</h3>
                <p>
                  Time: {event.startTime} - {event.endTime}
                </p>
                <p>{event.description}</p>
              </div>
            ))}
          </div>
        )}{" "}
        <div className="font-semibold">
          {/* Custom Dialog */}
          {isDialogOpen && (
            <div className="fixed  inset-0 bg-black/80 flex items-center justify-center z-50">
              <div className="bg-white glass p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold my-4 text-center">
                  Event for {selectDate.format("MMMM D, YYYY")}
                </h2>
                <p className="text-center">
                  Here you can add details for the event.
                </p>
                <div className="flex items-center my-4 gap-4">
                  <p className="w-1/4 whitespace-nowrap font-semibold">
                    Event Name
                  </p>
                  <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name of event"
                    className="flex-1 border border-black rounded text-black"
                  />
                </div>

                {/* Start Time Picker */}
                <div className="my-4 w-full">
                  <label className="block">Start Time</label>
                  <TimePicker
                    value={startTime}
                    onChange={setStartTime}
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
                <div className="flex items-center my-4 gap-4">
                  <div className="flex flex-col">
                    <h6 className="w-1/4 whitespace-nowrap text-sm">
                      Description
                    </h6>
                    <p>(optional)</p>
                  </div>
                  <input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description for the event"
                    className="flex-1 border border-black rounded text-black"
                  />
                </div>
                <button
                  className="mt-4 bg-green-500 text-white p-2 rounded"
                  onClick={() => save()} // Close the dialog
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
