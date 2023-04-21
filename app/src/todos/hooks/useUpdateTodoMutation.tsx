import { Todo } from "../../../../shared/types";
import { todoStore } from "../data/db";
import { store } from "../../store/store";
import { useUpdateTodoMutation as updateTodoApi } from "../api/todo-api";
import { load } from "../todo-slice";

const _upsertTodoLocal = async (todo: Partial<Todo>, apiFailed: boolean) => {
  const dispatch = store.dispatch;

  if (apiFailed) {
    await todoStore.upsert({ ...todo, state: "Modified" });
  } else {
    await todoStore.upsert({ ...todo, state: "Unmodified" });
  }
  const todos = await todoStore.getAll();
  dispatch(load(todos));
};

const useUpdateTodoMutation = () => {
  const [updateTodoRemote] = updateTodoApi();

  const updateTodosMaybe = async (todo: Partial<Todo>) => {
    try {
      const error = await updateTodoRemote(todo);
      if (error) {
        await _upsertTodoLocal(todo, true);
      } else {
        await _upsertTodoLocal(todo, false);
      }
    } catch (error) {
      await _upsertTodoLocal(todo, true);
    }
  };

  return updateTodosMaybe;
};

export default useUpdateTodoMutation;
