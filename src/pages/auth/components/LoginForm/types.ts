export interface LoginDto {
  id: string;
  passwd: string;
}

export interface LoginVo {
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  jwt: string;
}