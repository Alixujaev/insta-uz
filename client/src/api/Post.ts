import { BASE_URL, CreatePostBody } from "@/consts"
import axios from "axios"

export const UPLOAD = (body: any, token: string) => {
  return axios.post(BASE_URL + "/api/upload", body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const CREATE_POST = (body: CreatePostBody, token: string) => {
  return axios.post(BASE_URL + "/api/create-post", body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}