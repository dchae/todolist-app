import { MonthStr, YearStr, DateStr } from "./types";

const toDateStr = (month: "" | MonthStr, year: "" | YearStr) => {
  return (
    month && year ? `${month}/${year.slice(-2)}` : "No Due Date"
  ) as DateStr;
};

export default { toDateStr };
