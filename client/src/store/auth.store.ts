import { REGISTRATION } from "@/api/Auth"
import { RegisterBody } from "@/consts";

export const handleRegister = async (body: RegisterBody) => {
  const result = await REGISTRATION(body)
  

  return result
}