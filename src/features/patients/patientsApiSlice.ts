import { apiSlice } from '../api/apiSlice';

export interface Patient {
    address: string;
    phone: string;
    _id: string;
    firstName: string;
    lastName: string;
    dateOfBirth?: string;
    gender: string;
    contact?: {
        phone?: string;
        address?: string;
        email?: string;
    };
    assignedDoctor?: string;
    admissionType?: string;
    ward?: string;
    bedNumber?: string;
    createdAt: string;
}

export interface GetPatientsResponse {
    data: Patient[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface GetPatientsQuery {
    page?: number;
    limit?: number;
    search?: string;
}

export interface Encounter {
    _id: string;
    timestamp: string;
    notes: string;
    type: 'Clinical' | 'Discharge' | 'Admission';
    vitals?: {
        bpSystolic?: number;
        bpDiastolic?: number;
        heartRate?: number;
        respRate?: number;
        tempC?: number;
        spo2?: number;
    };
}

export interface GetPatientResponse {
    data: {
        patient: Patient;
        latestEncounters: Encounter[];
    };
}

export const patientsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPatients: builder.query<GetPatientsResponse, GetPatientsQuery>({
            query: ({ page = 1, limit = 10, search = '' }) => ({
                url: '/patients',
                params: { page, limit, search },
            }),
            providesTags: ['Patient'],
        }),
        getPatient: builder.query<GetPatientResponse, { id: string; latestEncounters?: number }>({
            query: ({ id, latestEncounters = 10 }) => ({
                url: `/patients/${id}`,
                params: { latestEncounters },
            }),
            providesTags: (result, error, { id }) => [{ type: 'Patient', id }],
        }),
        getPatientEncounters: builder.query<{ data: Encounter[] }, { id: string; limit?: number; search?: string; startDate?: string; endDate?: string }>({
            query: ({ id, limit = 20, search, startDate, endDate }) => {
                const params: any = { limit };
                if (search) params.search = search;
                if (startDate) params.startDate = startDate;
                if (endDate) params.endDate = endDate;
                return {
                    url: `/encounters/patients/${id}/encounters`,
                    params,
                };
            },
            providesTags: (result, error, { id }) => [{ type: 'Patient', id }],
        }),
        createEncounter: builder.mutation<{ data: Encounter }, { patientId: string; notes: string; vitals?: any }>({
            query: ({ patientId, ...body }) => ({
                url: `/encounters/patients/${patientId}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, { patientId }) => [{ type: 'Patient', id: patientId }, 'Dashboard'],
        }),
        updatePatient: builder.mutation<{ data: Patient }, { id: string; data: Partial<Patient> }>({
            query: ({ id, data }) => ({
                url: `/patients/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Patient', id }, 'Patient'],
        }),
        dischargePatient: builder.mutation<{ data: Patient }, string>({
            query: (id) => ({
                url: `/patients/${id}/discharge`,
                method: 'POST',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Patient', id }, 'Patient', 'Dashboard'],
        }),
        admitPatient: builder.mutation<{ data: Patient }, { id: string; assignedDoctor: string; ward: string; bedNumber: string; admissionType?: string }>({
            query: ({ id, ...body }) => ({
                url: `/patients/${id}/admit`,
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Patient', id }, 'Patient', 'Dashboard'],
        }),
        deletePatient: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
                url: `/patients/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Patient'],
        }),
    }),
});

export const {
    useGetPatientsQuery,
    useGetPatientQuery,
    useGetPatientEncountersQuery,
    useCreateEncounterMutation,
    useUpdatePatientMutation,
    useDischargePatientMutation,
    useAdmitPatientMutation,
    useDeletePatientMutation
} = patientsApiSlice;
