import { apiSlice } from "../api/apiSlice";

export interface Hospital {
    _id: string;
    name: string;
    address: string;
    metadata?: any;
    createdAt: string;
}

export interface UpdateHospitalRequest {
    name?: string;
    address?: string;
    metadata?: any;
}

export const hospitalApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getHospital: builder.query<{ data: Hospital }, void>({
            query: () => "/hospitals",
            providesTags: ["Hospital"],
        }),
        updateHospital: builder.mutation<{ data: Hospital }, UpdateHospitalRequest>({
            query: (data) => ({
                url: "/hospitals",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Hospital"],
        }),
    }),
});

export const { useGetHospitalQuery, useUpdateHospitalMutation } = hospitalApiSlice;
