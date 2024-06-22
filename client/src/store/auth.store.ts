import { REGISTRATION, VERIFY_CODE } from "@/api/Auth"
import { RegisterBody, VerifyCodeBody } from "@/consts";

export const handleRegister = async (body: RegisterBody) => {
  const result = await REGISTRATION(body)
  

  return result
}


export const handleVerify = async (body: VerifyCodeBody) => {
  const result = await VERIFY_CODE(body)

  return result
}