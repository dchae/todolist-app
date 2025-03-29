export type DayStr =
  | `0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  | `1${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  | `2${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  | `3${0 | 1}`;

export type MonthStr =
  | `0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  | `1${0 | 1 | 2}`;

export type YearStr = `19${number & {}}${number & {}}`;

export type DateStr =
  | `${MonthStr}/${number & {}}${number & {}}}`
  | "No Due Date";

export type Tally = {
  [K in DateStr]?: number;
};

export interface TodoData {
  id: number;
  title: string;
  day: DayStr | "";
  month: MonthStr | "";
  year: YearStr | "";
  completed: boolean;
  description: string;
}

export interface Todo extends TodoData {
  date: DateStr;
}

export interface Filter {
  date: DateStr | undefined;
  completedOnly: boolean;
}

export type GroupName = DateStr | "All Todos" | "Completed";

export interface TodosHook {
  all: Todo[];
  setAll: React.Dispatch<React.SetStateAction<Todo[]>>;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  filtered: Todo[];
  activeGroupName: GroupName;
}
