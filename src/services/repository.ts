import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Issue } from '../types/Issue';
import { Repository } from '../types/Repository';
import { BASE_URL, ENDPOINTS } from '../utils/endpoints';

export const repositoryApi = createApi({
  reducerPath: 'repositoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getRepositoryByRepo: builder.query<Repository, string>({
      query: ENDPOINTS.repository,
    }),
    getIssuesByRepo: builder.query<Issue[], string>({
      query: ENDPOINTS.issues,
    }),
  }),
});

export const { useGetRepositoryByRepoQuery, useGetIssuesByRepoQuery } = repositoryApi;