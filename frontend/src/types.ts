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

export type TodoValues = Partial<Todo>;

export interface FormData {
  id?: number;
  title: string;
  day: DayStr | "";
  month: MonthStr | "";
  year: YearStr | "";
  description: string;
}

export type FormDataAction =
  | { reset: true; field?: null; value?: null }
  | { field: "id"; value: number }
  | { field: "title"; value: string }
  | { field: "day"; value: DayStr | "" }
  | { field: "month"; value: MonthStr | "" }
  | { field: "year"; value: YearStr | "" }
  | { field: "description"; value: string };

// export type FormDataAction =
//   | { reset: true; field?: null; value?: null }
//   | {
//       [K in keyof FormData]: {
//         field: K;
//         value: FormData[K];
//       };
//     }[keyof FormData];

export interface Filter {
  date: DateStr | undefined;
  completedOnly: boolean;
}

export type GroupName = DateStr | "All Todos" | "Completed";

export interface TodosHook {
  all: Todo[];
  setAll: (data: Todo[]) => void;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  filtered: Todo[];
  activeGroupName: GroupName;
  deleteTodo: (id: number) => void;
  create: (data: FormData) => void;
  update: (data: TodoValues) => void;
}
