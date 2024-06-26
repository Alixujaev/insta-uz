import { ABOUT_ME, EXISTS_USER, GET_USER_INFO, SEARCH_USERS, UPDATE_USER } from "@/api/User"

export const aboutMe = async(token:string) => {

  const result = await ABOUT_ME(token)

  return result
}

export const handleGetUser = async (username: string) => {
  const result = await GET_USER_INFO(username);
  return result
}

export const handleUpdate = async (body: any, token: string) => {
  const result = await UPDATE_USER(body, token);
  return result
}

export const handleCheckUsername = async (username: string) => {
  const result = await EXISTS_USER(username);
  return result
}

export const handleSearchUsers = async (username: string) => {
  const result = await SEARCH_USERS(username);
  return result
}