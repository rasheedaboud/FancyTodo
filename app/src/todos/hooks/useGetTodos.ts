import { useEffect, useState } from "react";
import { todoStore } from "../data/db";
import { useDispatch, useSelector } from "react-redux";
import { load } from "../todo-slice";
import { RootState, useAppSelector } from "../../store/store";
import { useGetTodosQuery as loadTodos } from "../api/todo-api";
export const useGetTodosQuery = () => {
  const todos = useAppSelector((state) => state.todoState.todos);
  const filteredTodos = useAppSelector((state) => state.todoState.filter);
  const dispatch = useDispatch();
  const { data, isError } = loadTodos();

  useEffect(() => {
    const loadTodosMaybe = async () => {
      if (!isError) {
        await todoStore.batchUpsert(data);
      }
    };
    loadTodosMaybe();
  }, [data]);

  useEffect(() => {
    const setInitalState = async () => {
      const todos = await todoStore.getAll();
      dispatch(load(todos));
    };
    setInitalState();
  }, [data]);
  return [todos, filteredTodos];
};
