import { useState, useMemo } from "react";
import TodoService from "../services/TodoListAPI.ts";
import utils from "../utils";
import {
  Todo,
  Filter,
  GroupName,
  TodosHook,
  FormData,
  TodoValues,
  Tally,
} from "../types";

const useTodos = (): TodosHook => {
  const [all, setAll] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>({});

  const filtered = useMemo(() => {
    const matches = all.filter((todo) => {
      const date = utils.toDateStr(todo.month, todo.year);
      if (filter.date !== undefined && filter.date !== date) return false;
      if (filter.completedOnly) return todo.completed;
      return true;
    });

    const uncompleted: Todo[] = [];
    const completed: Todo[] = [];
    matches.sort((a, b) => b.id - a.id);
    matches.forEach((todo) => {
      (todo.completed ? completed : uncompleted).push(todo);
    });
    return uncompleted.concat(completed);
  }, [all, filter]);

  const activeGroupName = useMemo(() => {
    let name;
    if (filter.date === undefined) {
      name = filter.completedOnly ? "Completed" : "All Todos";
    } else {
      name = filter.date;
    }
    return name as GroupName;
  }, [filter]);

  const create = async (data: FormData) => {
    try {
      const created = await TodoService.create(data);
      setAll(all.concat(created));
    } catch (e: unknown) {
      utils.handleAPIError(e);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await TodoService.deleteTodo(id);
      setAll(all.filter((todo) => todo.id !== id));
    } catch (e: unknown) {
      utils.handleAPIError(e);
    }
  };

  const update = async ({ id, ...newValues }: TodoValues) => {
    try {
      if (typeof id !== "number") throw new Error("invalid id");
      const updated = await TodoService.update(id, newValues);
      setAll(all.map((todo) => (todo.id === id ? updated : todo)));
    } catch (e: unknown) {
      utils.handleAPIError(e);
    }
  };

  const allCompleted = () => all.filter(({ completed }) => completed);

  const datesTally = (completedOnly = false) => {
    const tally: Tally = {};
    const todos = completedOnly ? allCompleted() : all;
    for (const todo of todos) {
      const date = utils.toDateStr(todo.month, todo.year);
      tally[date] = (tally[date] ?? 0) + 1;
    }
    return tally;
  };

  return {
    all,
    setAll,
    filter,
    setFilter,
    filtered,
    activeGroupName,
    deleteTodo,
    create,
    update,
    allCompleted,
    datesTally,
  };
};

export default useTodos;
