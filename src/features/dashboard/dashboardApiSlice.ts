import { apiSlice } from '../api/apiSlice';

export interface DashboardStats {
    totalPatients: number;
    admittedToday: number;
    dischargedToday: number;
    availableBeds: number;
    totalBeds: number;
    occupiedBeds: number;
    occupancyPercentage: number;
    wards: WardOccupancy[];  // Include wards in stats response
}

export interface WardOccupancy {
    _id: string;
    name: string;
    type: string;
    patients: number;
    capacity: number;
    availableBeds: number;
    occupancyPercentage: number;
}

export interface DashboardStatsResponse {
    data: DashboardStats;
}

export interface WardOccupancyResponse {
    data: WardOccupancy[];
}

export const dashboardApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStats: builder.query<DashboardStatsResponse, void>({
            query: () => ({
                url: '/dashboard/stats',
            }),
            providesTags: ['Dashboard'],
        }),
        getWardOccupancy: builder.query<WardOccupancyResponse, void>({
            query: () => ({
                url: '/dashboard/wards',
            }),
            providesTags: ['Dashboard'],
        }),
    }),
});

export const {
    useGetDashboardStatsQuery,
    useGetWardOccupancyQuery,
} = dashboardApiSlice;
