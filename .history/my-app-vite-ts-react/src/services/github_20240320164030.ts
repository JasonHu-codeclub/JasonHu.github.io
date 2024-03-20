export type Milestone = {
    id:number;
    number:number;
    title:string;
    description:string;
    open_issues:number;
}
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