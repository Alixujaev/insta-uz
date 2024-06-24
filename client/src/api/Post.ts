import { BASE_URL } from "@/consts"
import axios from "axios"

export const UPLOAD = (body: any, token: string) => {
  console.log(body);
  
  return axios.post(BASE_URL + "/api/upload", body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const CREATE_POST = (body: any) => {
  return axios.post(BASE_URL + "/api/create-post", body)
}