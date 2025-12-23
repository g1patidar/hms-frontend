import { apiSlice } from '../api/apiSlice';

export interface DashboardStats {
    totalPatients: number;
    admittedToday: number;
    dischargedToday: number;
}



export interface DashboardStatsResponse {
    data: DashboardStats;
}



export const dashboardApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStats: builder.query<DashboardStatsResponse, void>({
            query: () => ({
                url: '/dashboard/stats',
            }),
            providesTags: ['Dashboard'],
        }),

    }),
});

export const {
    useGetDashboardStatsQuery,
} = dashboardApiSlice;
