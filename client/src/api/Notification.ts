import { BASE_URL } from "@/consts";
import axios from "axios";

export const GET_NOTIFICATIONS = (token: string) => {
  return axios.get(BASE_URL + "/api/notifications", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}