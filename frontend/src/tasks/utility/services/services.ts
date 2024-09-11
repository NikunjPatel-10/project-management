import { QueryTags } from "../../../core/utility/constants/constants";
import { commonServices } from "../../../core/utility/services/service";
import { ITask } from "../../../shared/utility/models/models";

export const taskServices = commonServices.injectEndpoints({
  endpoints: (builder) => ({
    // Add Task
    addTask: builder.mutation<ITask, { body: ITask }>({
      query: ({ body }) => ({
        method: "POST",
        url: `/tasks`,
        data: body,
      }),
      invalidatesTags: (result: ITask | undefined) => {
        if (result) {
          return [QueryTags.TASK_LIST];
        } else return [""];
      },
    }),
    // Edit Task
    editTask: builder.mutation<ITask, { body: ITask }>({
      query: ({ body }) => ({
        method: "PUT",
        url: `tasks/${body.id}`,
        data: body,
      }),
      invalidatesTags: (result: ITask | undefined) => {
        if (result) {
          return [QueryTags.TASK_LIST];
        } else return [""];
      },
    }),
    // Delete Task
    deleteTask: builder.mutation<ITask, { id: number }>({
      query: ({ id }) => ({
        method: "DELETE",
        url: `/tasks/${id}`,
      }),
      invalidatesTags: (result: ITask | undefined) => {
        if (result) {
          return [QueryTags.TASK_LIST];
        } else return [""];
      },
    }),
  }),
});

export const {
  useAddTaskMutation,
  useEditTaskMutation,
  useDeleteTaskMutation,
} = taskServices;
