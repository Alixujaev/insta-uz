import { BASE_URL } from "@/consts";
import axios from "axios";

export const CREATE_CONVERSATION = (token: string, id: string) => {
  return axios.post(BASE_URL + `/api/conversations`, {receiverId: id},  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

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

export const GET_CONVERSATION_BY_USER_ID = (token:string, id:string) => {
  return axios.get(BASE_URL + `/api/messages-user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const DELETE_CONVERSATION = (token: string, id: string) => {
  return axios.delete(BASE_URL + `/api/conversations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
