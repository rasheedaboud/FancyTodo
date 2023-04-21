import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { requestToken } from "../auth/Auth";

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: async (headers, { getState }) => {
      const token = await requestToken();

      if (token) {
        headers.set("x-authorization", `Bearer ${token}`);
      } else {
        throw "Invalid token. Request cancelled.";
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["GetTodos"],
});
