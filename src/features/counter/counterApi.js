import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Оголошуємо API-сервіс
export const counterApi = createApi({
  reducerPath: 'counterApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.restful-api.dev/' }),
  endpoints: (builder) => ({
    getCounterValue: builder.query({
      query: () => 'objects',
      transformResponse: (response) => response,
    }),
  }),
});

export const { useGetCounterValueQuery } = counterApi;