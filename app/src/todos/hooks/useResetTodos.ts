import { useEffect, useState } from "react";
import { todoStore } from "../data/db";

export const useResetTodos = () => {
  useEffect(() => {
    const resetTodos = async () => {
      await todoStore.reset();
    };
    resetTodos();
  }, []);
};
