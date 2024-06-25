import { BASE_URL } from "@/consts"
import axios from "axios"

export const ABOUT_ME = (token: string) => {
  return axios.get(BASE_URL + "/api/about-me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const GET_USER_INFO = (username: string) => {
  return axios.get(BASE_URL + `/api/${username}`)
}