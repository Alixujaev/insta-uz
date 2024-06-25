import { ABOUT_ME, GET_USER_INFO, UPDATE_USER } from "@/api/User"

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