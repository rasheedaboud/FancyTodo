import { TableServiceClient, TableClient } from "@azure/data-tables";
import { Todo } from "../../shared/types";

const todoTable = "Todos";
const connectionString = process.env.TABLE_STORAGE_CONNECTION;
const tableService = TableServiceClient.fromConnectionString(connectionString);
const tableClient = TableClient.fromConnectionString(
  connectionString,
  todoTable,
  { retryOptions: { maxRetries: 10 } }
);

const createTodoTable = async () => {
  try {
    return await tableService.createTable(todoTable);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const listAllTodos = async (): Promise<Todo[]> => {
  try {
    await createTodoTable();
    let result: Todo[] = [];
    const todos = await tableClient.listEntities<Todo>();

    for await (const todo of todos) {
      result.push({
        id: todo.id,
        complete: todo.complete,
        due: todo.due,
        notes: todo.notes,
        priority: todo.priority,
        status: todo.status,
        title: todo.title,
        state: "Unmodified",
      });
    }
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addTodo = async (todo: Todo, email: string): Promise<void> => {
  try {
    await createTodoTable();
    if (!email) {
      throw Error("unauthorized.");
    }
    if (!todo) {
      throw Error("invalid todo.");
    }

    const todos = await tableClient.upsertEntity<Todo>({
      ...todo,
      partitionKey: email,
      rowKey: todo.id,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteTodo = async (
  id: string,
  email: string
): Promise<void | Error> => {
  try {
    await createTodoTable();
    if (!email) {
      throw Error("unauthorized.");
    }
    if (!id) {
      throw Error("invalid todo.");
    }
    const todos = await tableClient.deleteEntity(email, id);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
