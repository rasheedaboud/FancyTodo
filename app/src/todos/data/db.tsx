import localforage from "localforage";

import { v4 as Guid } from "uuid";
import { Todo, validateTodo } from "../../../../shared/types";

const store = localforage.createInstance({
  name: "todods",
  description: "todo storage",
  driver: localforage.INDEXEDDB,
  version: 1.0,
});

class TodoStore {
  readonly db: LocalForage;

  constructor() {
    if (store == null) throw Error("database failed to initialize.");
    this.db = store;
  }
  async reset() {
    try {
      await this.db.clear();
    } catch (error) {
      console.log(error);
    }
  }
  async upsert(todo: Partial<Todo> | null) {
    try {
      const validTodo = validateTodo(todo);

      await this.db.setItem(validTodo.id, validTodo);
    } catch (error) {
      console.log(error);
    }
  }
  async markUnmodified(todo: Partial<Todo> | null) {
    try {
      const validTodo = validateTodo(todo);

      await this.db.setItem(validTodo.id, {
        ...validTodo,
        state: "Unmodified",
      });
    } catch (error) {
      console.log(error);
    }
  }
  async batchUpsert(todos: Todo[] | null) {
    try {
      if (todos) {
        await Promise.all(
          todos.map((item) => {
            this.db.setItem(item.id, item);
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  async delete(id: string) {
    try {
      await this.db.removeItem(id);
    } catch (error) {
      console.log(error);
    }
  }
  async getAll(ignoreFilter?: boolean): Promise<Todo[]> {
    try {
      const keys = await this.db.keys();
      const todos = await Promise.all(
        keys.map((key) => {
          return this.db.getItem<Todo>(key);
        })
      );
      if (ignoreFilter && ignoreFilter === true) {
        return todos;
      } else {
        return todos.filter((item) => item.state != "Deleted");
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

export const todoStore = new TodoStore();
