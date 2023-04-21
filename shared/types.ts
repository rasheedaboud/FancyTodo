import moment, { Moment } from "moment";
import { v4 as guid } from "uuid";

export const todoState = ["New", "Modified", "Deleted", "Unmodified"] as const;
export type TodoState = typeof todoState[number];

export const todoStatus = ["Not Started", "In Progress", "Complete"] as const;
export type TodoStatus = typeof todoStatus[number];

export const priority = ["Low", "Medium", "Important", "Urgent"] as const;
export type Priority = typeof priority[number];
export type Todo = {
  id: string;
  title: string;
  notes: string;
  status: TodoStatus;
  priority: Priority;
  due: Date;
  complete: boolean;
  state: TodoState;
};

export const newTodo = (): Todo => {
  return {
    id: guid(),
    complete: false,
    status: "Not Started",
    notes: "",
    priority: "Low",
    due: new Date(),
    title: "",
    state: "Unmodified",
  };
};

export const validateTodo = (todo: Partial<Todo> | null) => {
  if (todo == null) throw Error("to is null or undefined.");
  if (todo.title == null || todo.title === "")
    throw Error("todo title must have a value.");
  if (todo.title == null || todo.title.length <= 5)
    throw Error("todo title must be longer than 5 characters.");

  if (todo.id === "") {
    return {
      ...todo,
      id: guid(),
    };
  } else {
    return todo;
  }
};

export interface TableStorageError {
  "odata.error": OdataError;
}

export interface OdataError {
  code: string;
  message: Message;
}

export interface Message {
  lang: string;
  value: string;
}
