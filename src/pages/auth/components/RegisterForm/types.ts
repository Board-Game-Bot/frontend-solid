export interface RegisterDto {
  id: string;
  passwd: string;
}

export interface RegisterVo {
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  jwt: string;
}