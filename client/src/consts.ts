export const BASE_URL = `http://localhost:8000`;

export enum USER_ACTIONS {
  SET_USER = 'SET_USER',
}

export type RegisterBody = {
  email: string,
  password: string,
  username: string
  full_name: string
}

export type VerifyCodeBody = {
  code: string,
  email: string
}

export type LoginBody = {
  username: string,
  password: string
}