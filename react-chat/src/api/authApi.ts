import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RegistrationFormFields } from "../pages/RegisterPage";
import { RegistratedUser } from "./types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/auth",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<
      RegistratedUser,
      Omit<RegistrationFormFields, "confirmPassword">
    >({
      query: (user) => ({
        url: "/registration",
        method: "POST",
        body: { ...user },
      }),
    }),
    loginUser: builder.mutation<
      RegistratedUser,
      Omit<RegistrationFormFields, "confirmPassword" | "email">
    >({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: { ...user },
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
