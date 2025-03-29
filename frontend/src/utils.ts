import { MonthStr, YearStr } from "./types";

const toDateStr = (month: "" | MonthStr, year: "" | YearStr) => {
  return month && year ? `${month}/${year.slice(-2)}` : "No Due Date";
};

export default { toDateStr };
