import { BASE_URL, MessageBody } from "@/consts";
import axios from "axios";

export const CREATE_MESSAGE = (body: MessageBody, token: string) => {
  return axios.post(BASE_URL + "/api/messages", body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}