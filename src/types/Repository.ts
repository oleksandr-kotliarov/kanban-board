import { User } from './User';

export interface Repository {
  html_url: string;
  stargazers_count: number;
  name: string;
  owner: User;
}
