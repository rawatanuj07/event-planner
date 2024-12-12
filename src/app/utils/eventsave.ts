import dayjs from "dayjs";
interface Event {
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    date: string;
  }
export const saveEvent = (
    name: string,
    description: string,
    startTime: string | null,
    endTime: string | null,
    selectDate: dayjs.Dayjs,
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
  if (name && startTime && endTime) {
    const eventData = {
      name,
      description,
      startTime,
      endTime,
      date: selectDate.toDate().toDateString(),
    };

    // Getting existing events from localStorage or initialize as empty array
    const existingEvents = JSON.parse(localStorage.getItem("events") || "[]");

    // Check for conflicts (same name or overlapping time)
    const isConflict = existingEvents.some((event: any) => {
      return (
        // Check if the event's date and name are the same
        (event.date === eventData.date && event.name === eventData.name) ||
        // Check if the start and end times overlap
        (event.date === eventData.date &&
          ((dayjs(event.startTime).isBefore(dayjs(eventData.endTime)) &&
            dayjs(event.endTime).isAfter(dayjs(eventData.startTime))) ||
            (dayjs(event.startTime).isBefore(dayjs(eventData.startTime)) &&
              dayjs(event.endTime).isAfter(dayjs(eventData.startTime)))))
      );
    });

    if (isConflict) {
      alert("There is a conflict with an existing event. Please check the name and time.");
    } else {
      // Add the new event if no conflict
      existingEvents.push(eventData);

      // Save updated events to localStorage
      localStorage.setItem("events", JSON.stringify(existingEvents));

      // Close the dialog after saving
      setIsDialogOpen(false);
    }
  } else {
    alert("Please fill in all required fields!");
  }
};
