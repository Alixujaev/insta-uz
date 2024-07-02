import { BASE_URL, CreatePostBody } from "@/consts";
import axios from "axios";

export const CREATE_STORY = (body: CreatePostBody, token: string) => {
  return axios.post(BASE_URL + "/api/create-story", body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const GET_STORY = (id: string, token: string) => {
  return axios.get(BASE_URL + `/api/story/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const DELETE_STORY = (id: string, token: string) => {
  return axios.delete(BASE_URL + `/api/delete-story/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const GET_VIEWERS = (id: string, token: string) => {
  return axios.get(BASE_URL + `/api/viewers/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const VIEW_STORY = (id: string, token: string) => {
  return axios.put(BASE_URL + `/api/view/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const GET_FOLLOWING_STORIES = (token: string) => {
  return axios.get(BASE_URL + `/api/stories`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}