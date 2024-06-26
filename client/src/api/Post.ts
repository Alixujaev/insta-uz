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

export const GET_USER_POSTS = (id: string) => {
  return axios.get(BASE_URL + `/api/user-posts/${id}`)
}

export const LIKE = (id: string, token: string) => {
  return axios.put(BASE_URL + `/api/like/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}