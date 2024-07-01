import { BASE_URL, CreatePostBody } from "@/consts";
import axios from "axios";

export const CREATE_STORY = (body: CreatePostBody, token: string) => {
  return axios.post(BASE_URL + "/api/create-story", body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}