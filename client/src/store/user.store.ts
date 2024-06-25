import { ABOUT_ME, GET_USER_INFO } from "@/api/User"

export const aboutMe = async(token:string) => {

  const result = await ABOUT_ME(token)

  return result
}

export const handleGetUser = async (username: string) => {
  const result = await GET_USER_INFO(username);
  return result
}