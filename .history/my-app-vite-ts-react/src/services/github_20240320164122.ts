export enum State {
  All = "all",
  Open = "open",
  Closed = "closed",
}
export type User = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
};

export type Label = {
  id: number;
  name: string;
  description: string;
  color: string;
};

export type Milestone = {
  id: number;
  number: number;
  title: string;
  description: string;
  open_issues: number;
};
export type Issue = {
  id: number;
  number: number;
  title: string;
  state: State;
  body: string;
  comments: number;
  user: User;
  milestone: Milestone;
  labels: Label[];
  html_url: string;
  created_at: string;
  updated_at: string;
};
