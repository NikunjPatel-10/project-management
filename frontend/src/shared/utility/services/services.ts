import { QueryTags } from "../../../core/utility/constants/constants";
import { commonServices } from "../../../core/utility/services/service";
import { IProject, ITask } from "../models/models";

export const sharedServices = commonServices.injectEndpoints({
  endpoints: (builder) => ({
    getProjectsByUserId: builder.query<IProject[], { userId: number }>({
      query: ({ userId }) => ({
        method: "GET",
        url: `users/${userId}/projects`,
      }),
      providesTags: [QueryTags.PROJECT_LIST],
    }),
    // getTasksByUserId: builder.query<ITask[], { userId: number, projectId:number }>({
    //   query: ({ userId, projectId }) => ({
    //     method: "GET",
    //     url: `users/${userId}/projects/${projectId}/tasks`,
    //   }),
    //   providesTags: [QueryTags.TASK_LIST],
    // }),
    getTasksByUserId: builder.query<ITask[], { userId: number, projectId?: number }>({
      query: ({ userId, projectId }) => {
        // Construct the URL with or without projectId
        let url = `users/${userId}/tasks`;
        if (projectId ) {
          url += `?projectId=${projectId}`;
        }
    
        return {
          method: "GET",
          url,
        };
      },
      providesTags: [QueryTags.TASK_LIST],
    }),
  }),
});

export const { useGetProjectsByUserIdQuery, useGetTasksByUserIdQuery } =
  sharedServices;
