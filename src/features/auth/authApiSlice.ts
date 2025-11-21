import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updatePassword: builder.mutation<{ success: boolean; message: string }, { currentPassword: string; newPassword: string }>({
            query: (data) => ({
                url: "/auth/change-password",
                method: "POST",
                body: data,
            }),
        }),
        updateProfile: builder.mutation<{ success: boolean; user: any }, { name: string; email: string }>({
            query: (data) => ({
                url: "/auth/me",
                method: "PUT",
                body: data,
            }),
        }),
    }),
});

export const { useUpdatePasswordMutation, useUpdateProfileMutation } = authApiSlice;
