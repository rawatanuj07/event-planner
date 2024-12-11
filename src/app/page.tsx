import Image from "next/image";
import { generateDate } from "./utils/calender";

export default function Home() {
  console.log("dates are ", generateDate());

  return (
    <>
      <h1>hello</h1>
    </>
  );
}
