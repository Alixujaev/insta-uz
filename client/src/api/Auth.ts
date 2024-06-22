import { BASE_URL, RegisterBody } from "@/consts"
import axios from "axios"

export const REGISTRATION = (body: RegisterBody) => {
  return axios.post(BASE_URL + "/api/send-code", body)
}