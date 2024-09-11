import Axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { BaseQueryFn } from "@reduxjs/toolkit/query/react";

export const axiosBaseQuery =
  (
    apiBaseURL: string
  ): BaseQueryFn<AxiosRequestConfig, AxiosResponse, AxiosError> =>
  async ({ url, method, data, params }) => {
    try {
      Axios.defaults.baseURL = apiBaseURL;
      const result = await Axios({
        url,
        method,
        data,
        params,
      });
      return { data: result?.data };
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      return {
        error,
      };
    }
  };
