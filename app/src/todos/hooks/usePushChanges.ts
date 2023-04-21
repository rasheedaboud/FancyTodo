import { useState, useEffect } from "react";
import { useDeleteTodoMutation, useUpdateTodoMutation } from "../api/todo-api";
import { todoStore } from "../data/db";

export const usePushChanges = () => {
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function handleOnlineStatus() {
      setIsOnline(navigator.onLine);
    }

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  useEffect(() => {
    const pushChanges = async () => {
      const todos = await todoStore.getAll(true);
      todos.map(async (todo) => {
        switch (todo.state) {
          case "Deleted":
            const result = await deleteTodo(todo);
            todoStore.delete(todo.id);
            break;
          case "New":
            const addResult = await updateTodo(todo);
            await todoStore.markUnmodified(todo);
            break;
          case "Modified":
            const updateResult = await updateTodo(todo);
            await todoStore.markUnmodified(todo);
            break;
          default:
            break;
        }
      });
    };
    pushChanges();
  }, [isOnline]);
};
