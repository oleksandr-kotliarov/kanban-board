export const BASE_URL = 'https://api.github.com/';

export const ENDPOINTS = {
  repository: (repo: string) => `repos/${repo}`,
  issues: (repo: string) => `repos/${repo}/issues`,
};
