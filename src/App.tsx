import React, { memo, useEffect } from 'react';
import { LinkInput } from './components/LinkInput';
import { Navigation } from './components/Navigation';

import './App.scss';
import { KanbanBoard } from './components/KanbanBoard';
import { loadKanban } from './features/kanbanSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useGetIssuesByRepoQuery } from './services/repository';
import { Alert } from '@mui/material';

export const App: React.FC = memo(() => {
  const { link } = useAppSelector((state) => state.repositoryLink);

  const { data, isError,  } = useGetIssuesByRepoQuery(link);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadKanban({ data: data || [], link }));
  }, [data]);

  return (
    <div className="App">
      {isError && link.length > 0 && (
        <Alert severity="error">Something went wrong</Alert>
      )}
      <LinkInput />
      <Navigation />
      <KanbanBoard />
    </div>
  );
});
