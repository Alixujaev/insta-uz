import axios from "axios"

export const REGISTRATION = (body: any) => {
  return axios.post("/api/registration", body)
}