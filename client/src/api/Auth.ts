import { BASE_URL, RegisterBody, VerifyCodeBody } from "@/consts"
import axios from "axios"

export const REGISTRATION = (body: RegisterBody) => {
  return axios.post(BASE_URL + "/api/registration", body)
}


export const VERIFY_CODE = (body: VerifyCodeBody) => {
  return axios.post(BASE_URL + "/api/verify-code", body)
}


export const LOGIN = (body: any) => {
  return axios.post(BASE_URL + "/api/login", body)
}