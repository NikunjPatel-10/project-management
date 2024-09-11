import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { QueryTags } from "../constants/constants";

export const url = "http://localhost:3000/";

export const commonServices = createApi({
  reducerPath: "commonServices",
  baseQuery: axiosBaseQuery(url),
  endpoints: () => ({}),
  tagTypes: [QueryTags.PROJECT_LIST, QueryTags.TASK_LIST],
});
