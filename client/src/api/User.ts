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
  return axios.get(BASE_URL + `/api/profile/${username}`)
}

export const GET_USER_INFO_ID = (id: string) => {
  return axios.get(BASE_URL + `/api/id/${id}`)
}

export const UPDATE_USER = (body: any, token: string) => {
  return axios.put(BASE_URL + "/api/update-user", body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const EXISTS_USER = (username: string) => {
  return axios.get(BASE_URL + `/api/exist/${username}`)
}

export const SEARCH_USERS = (username: string) => {
  return axios.get(BASE_URL + `/api/search/${username}`)
}

export const FOLLOW = (id: string, token: string) => {
  return axios.put(BASE_URL + `/api/follow/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const UNFOLLOW = (id: string, token: string) => {
  return axios.put(BASE_URL + `/api/unfollow/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const GET_FOLLOWERS = (id: string) => {
  return axios.get(BASE_URL + `/api/followers/${id}`)
}

export const GET_FOLLOWING = (id: string) => {
  return axios.get(BASE_URL + `/api/following/${id}`)
}

export const DELETE_FOLLOWER = (id: string, token: string) => {
  return axios.put(BASE_URL + `/api/follower/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const RECOMENDEDS = (token: string) => {
  return axios.get(BASE_URL + `/api/recomendeds`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}