import { FORGOT_PASSWORD, LOGIN, REGISTRATION, VERIFY_CODE } from "@/api/Auth"
import { ForgotPasswordBody, LoginBody, RegisterBody, VerifyCodeBody } from "@/consts";

export const handleRegister = async (body: RegisterBody) => {
  const result = await REGISTRATION(body)
  

  return result
}


export const handleVerify = async (body: VerifyCodeBody) => {
  const result = await VERIFY_CODE(body)

  return result
}


export const handleLogin = async (body: LoginBody) => {
  const result = await LOGIN(body)

  return result 
}

export const handleReset = async (body: ForgotPasswordBody) => {
  const result = await FORGOT_PASSWORD(body)

  return result
}