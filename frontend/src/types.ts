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

export interface Todo {
  id: number;
  title: string;
  day: DayStr | "";
  month: MonthStr | "";
  year: YearStr | "";
  completed: boolean;
  description: string;
}

export type UpdateTodoData = Partial<Todo>;

export interface NewTodoData {
  id?: number;
  title: string;
  day?: DayStr | "";
  month?: MonthStr | "";
  year?: YearStr | "";
  description?: string;
}

export interface Filter {
  date?: DateStr;
  completedOnly?: true;
}

export type GroupName = DateStr | "All Todos" | "Completed";

export interface Group {
  name: GroupName;
  count: number;
  current?: true;
}
