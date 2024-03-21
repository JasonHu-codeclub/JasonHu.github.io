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


function toQuery(raw: Record<string,unknown>){
  const params = new URLSearchParams(); 
  Object.keys(raw).forEach((key)=>{
    if(raw[key]) params.append(key,String(raw[key]));
  })
  return `?${params.toString()}`;//append会自动添加 &
}

function hasBody(method: string){
  return ['POST', 'PUT', 'PATCH'].includes(method);
}

class GithubService {
  private apiBase = 'https://api.github.com'
  constructor(private token:string,private owner:string,private repo:string) {}
  private async request(method:string, url:string,data?:Record<string,unknown>){
    let query = '';
    let body = data;
    if(data && !hasBody(method)){
      // 如果data存在且该请求不应该包含请求体（如get,head请求）
      // 则将data转换成URL查询字符串格式
      // 再清空body请求体
      query = toQuery(data);
      body = undefined;
    }
    const response = await fetch([this.apiBase,url,query].join(''),{
      method,
      headers:{
        'Content-Type':'application/json;charset=UTF-8',
        'Accept':'application/vnd.github.v3+json',
        'Authorization':`token ${this.token}`,
      },
      body:body ? JSON.stringify(body) : undefined,
    });
    return response.json();
  }
}