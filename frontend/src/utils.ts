import axios from "axios";
import { MonthStr, YearStr, DateStr } from "./types";

const toDateStr = (month: "" | MonthStr, year: "" | YearStr) => {
  return (
    month && year ? `${month}/${year.slice(-2)}` : "No Due Date"
  ) as DateStr;
};

const handleAPIError = (e: unknown) => {
  let msg = "An unknown error occurred.";
  if (axios.isAxiosError(e) && e.response?.data) {
    msg = e.response.data;
  } else if (e instanceof Error) {
    msg = e.message;
  }
  alert(msg);
};

export default { toDateStr, handleAPIError };
