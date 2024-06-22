export const BASE_URL = `http://localhost:8000`;

export enum CreateUser {
  name = "name",
  username = "username",
  password = "password",
  email = "email",
  avatar = "avatar",
  bio = "bio",
  website = "website"
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