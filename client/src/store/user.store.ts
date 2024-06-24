import { ABOUT_ME } from "@/api/User"

export const aboutMe = async(token:string) => {

  const result = await ABOUT_ME(token)

  return result
}