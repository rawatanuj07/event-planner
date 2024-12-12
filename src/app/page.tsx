import { generateDate } from "./utils/calender";

export default function Home() {
  console.log("dates are ", generateDate());
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <>
      <div className="w-96 h-96">
        <div className="w-full grid grid-cols-7">
          {days.map((day, index) => {
            return <h1 className="h-14 grid place-content-center">{day}</h1>;
          })}
        </div>
        <div className="w-full grid grid-cols-7">
          {generateDate().map(({ date, currentMonth, today }, index) => {
            return (
              <div className="h-14 border-t grid place-content-center text-md">
                <h1
                  className={`${currentMonth ? "" : "text-gray-500 text-sm"} ${
                    today ? "bg-red-600 text-white" : ""
                  } h-10 w-10 grid place-content-center rounded-full hover:bg-white hover:text-black trasnition-all hover:cursor-pointer`}
                >
                  {date.date()}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
