export interface CurrentUser {
  email: string;
  name: string;
  guest?: boolean;
  registered?: boolean;
}

export interface Credentials {
  email: string;
  name?: string;
}
