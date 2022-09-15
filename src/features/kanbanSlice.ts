import { createSlice } from '@reduxjs/toolkit';
import { Issue } from '../types/Issue';
import { v4 as uuidv4 } from 'uuid';

interface KanbanField {
  id: string;
  title: string;
  tasks: Issue[];
}

interface SetActionPayload {
  col: number[];
  tasks: Issue[][];
  link: string;
}

interface loadActionPayload {
  data: Issue[];
  link: string;
}

export type KanbanState = KanbanField[];

const initialState: KanbanState = [
  {
    id: uuidv4(),
    title: 'Todos',
    tasks: [],
  },
  {
    id: uuidv4(),
    title: 'In Progress',
    tasks: [],
  },
  {
    id: uuidv4(),
    title: 'Done',
    tasks: [],
  },
];

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    loadKanban: (state, action: { payload: loadActionPayload }) => {
      const issues = JSON.parse(localStorage.getItem('issues') || '{}');
      const { data, link } = action.payload;

      localStorage.setItem('lastLink', link);

      if (link in issues) {
        for (let i = 0; i < 3; i++) {
          state[i].tasks = issues[link][i].tasks;
        }
      } else {
        for (let i = 0; i < 3; i++) {
          if (i === 0) {
            state[0].tasks = data;
          } else {
            state[i].tasks = [];
          }
        }
      }

      localStorage.setItem(
        'issues',
        JSON.stringify({
          ...issues,
          [link]: state,
        }),
      );
    },
    setKanban: (state, actions: { payload: SetActionPayload }) => {
      const issues = JSON.parse(localStorage.getItem('issues') || '{}');
      const { col, tasks, link } = actions.payload;

      col.forEach((col, index) => {
        state[col].tasks = tasks[index];
      });

      localStorage.setItem(
        'issues',
        JSON.stringify({
          ...issues,
          [link]: state,
        }),
      );
    },
  },
});

export const { setKanban, loadKanban } = kanbanSlice.actions;

export default kanbanSlice.reducer;
