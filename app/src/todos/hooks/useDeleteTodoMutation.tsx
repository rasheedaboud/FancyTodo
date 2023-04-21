import { Todo } from "../../../../shared/types";
import { todoStore } from "../data/db";
import { store, useAppSelector } from "../../store/store";
import { useDispatch } from "react-redux";
import { useDeleteTodoMutation as deleteTodoApi } from "../api/todo-api";
import { load } from "../todo-slice";

const _deleteTodoLocal = async (todo: Partial<Todo>, apiFailed: boolean) => {
  const dispatch = store.dispatch;

  if (apiFailed) {
    await todoStore.upsert({ ...todo, state: "Deleted" });
  } else {
    await todoStore.delete(todo.id);
  }
  const todos = await todoStore.getAll();
  dispatch(load(todos));
};

const useDeleteTodoMutation = () => {
  const todos = useAppSelector((state) => state.todoState.todos);

  const [deleteTodoRemote] = deleteTodoApi();

  const deleteTodosMaybe = async (todo: Partial<Todo>) => {
    try {
      const error = await deleteTodoRemote(todo);
      if (error) {
        await _deleteTodoLocal(todo, true);
      } else {
        await _deleteTodoLocal(todo, false);
      }
    } catch (error) {
      await _deleteTodoLocal(todo, true);
    }
  };

  return deleteTodosMaybe;
};

export default useDeleteTodoMutation;
