import { BASE_URL } from "@/consts";
import axios from "axios";

export const GET_CONVERSATIONS = (token: string, id: string) => {
  return axios.get(BASE_URL + `/api/conversations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const GET_ONE_CONVERSATION = (token: string, id: string) => {
  return axios.get(BASE_URL + `/api/messages/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}