import { IUser } from "../models/models";
import { commonServices } from "./service";

export const authService = commonServices.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => ({
        method: "GET",
        url: `users`,
      }),
    }),
    loginUser: builder.mutation<any, { userData: any }>({
      query: ({ userData }) => ({
        method: "POST",
        url: "login",
        data: userData,
        withCredentials:true
      }),
    }),
    refreshAuthToken: builder.mutation<any, void>({
      query: () => ({
        method: "GET",
        url: `login/refresh-token`,
        withCredentials:true,

      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLoginUserMutation,
  useRefreshAuthTokenMutation,
} = authService;
