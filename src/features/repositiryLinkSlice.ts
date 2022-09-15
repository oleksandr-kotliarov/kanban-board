import { createSlice } from '@reduxjs/toolkit';

interface RepositoryLinkState {
  link: string;
}

const initialState: RepositoryLinkState = {
  link: localStorage.getItem('lastLink') || '',
};

export const repositoryLinkSlice = createSlice({
  name: 'repositoryLink',
  initialState,
  reducers: {
    setRepositoryLink: (state, actions) => {
      state.link = actions.payload;
    },
  },
});

export const { setRepositoryLink } = repositoryLinkSlice.actions;

export default repositoryLinkSlice.reducer;
