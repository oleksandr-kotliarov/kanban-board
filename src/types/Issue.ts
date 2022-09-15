import { User } from './User';

export interface Issue {
  node_id: string;
  title: string;
  number: string;
  created_at: Date;
  user: User;
  comments: number;
}
