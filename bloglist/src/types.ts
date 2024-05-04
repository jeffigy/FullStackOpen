export type LoggedUserType = {
  name: string;
  username: string;
  token: string;
};

export type BlogType = {
  title: string;
  author: string;
  url: string;
  likes: number;
  user?: {
    username?: string;
    name?: string;
    id?: string;
  };
  id?: string;
};
