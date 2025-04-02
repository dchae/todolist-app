import axios from "axios";
import {
  Todo,
  MonthStr,
  YearStr,
  DateStr,
  Filter,
  Tally,
  GroupName,
} from "./types";

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

const activeGroupName = (filter: Filter) => {
  let name;
  if (filter.date === undefined) {
    name = filter.completedOnly ? "Completed" : "All Todos";
  } else {
    name = filter.date;
  }
  return name as GroupName;
};

const getSorted = (todos: Todo[]) => {
  todos.sort((a, b) => b.id - a.id);

  const uncompleted: Todo[] = [];
  const completed: Todo[] = [];
  todos.forEach((todo) => {
    (todo.completed ? completed : uncompleted).push(todo);
  });
  return uncompleted.concat(completed);
};

const getFiltered = (todos: Todo[], filter: Filter) => {
  const matches = todos.filter((todo) => {
    const date = toDateStr(todo.month, todo.year);
    if (filter.date !== undefined && filter.date !== date) return false;
    if (filter.completedOnly) return todo.completed;
    return true;
  });

  return getSorted(matches);
};

const allCompleted = (todos: Todo[]) =>
  todos.filter(({ completed }) => completed);

const datesTally = (todos: Todo[], completedOnly = false) => {
  const tally: Tally = {};
  todos = completedOnly ? allCompleted(todos) : todos;
  for (const todo of todos) {
    const date = toDateStr(todo.month, todo.year);
    tally[date] = (tally[date] ?? 0) + 1;
  }
  return tally;
};

export default {
  toDateStr,
  handleAPIError,
  activeGroupName,
  getFiltered,
  getSorted,
  allCompleted,
  datesTally,
};
