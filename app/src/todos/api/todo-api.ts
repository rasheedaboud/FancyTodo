import { Todo } from "../../../../shared/types";
import { baseApi } from "../../store/base-api";

const todoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => {
        return `/todos`;
      },
      providesTags: (result, err, args) =>
        // is result available?
        result
          ? // successful query
            [...result.map(({ id }) => ({ type: "GetTodos", id } as const))]
          : [{ type: "GetTodos", id: "LIST" }],
    }),
    updateTodo: builder.mutation<void, Partial<Todo>>({
      query: (todo) => ({
        url: `addTodo`,
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["GetTodos"],
    }),
    deleteTodo: builder.mutation<void, Partial<Todo>>({
      query: (todo) => ({
        url: `deleteTodo`,
        method: "DELETE",
        body: todo,
      }),
      invalidatesTags: ["GetTodos"],
    }),
  }),
});

export const {
  useLazyGetTodosQuery,
  useGetTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
