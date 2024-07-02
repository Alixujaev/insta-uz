import { CREATE_STORY, DELETE_STORY, GET_FOLLOWING_STORIES, GET_STORY, GET_VIEWERS, VIEW_STORY } from "@/api/Story"
import { CreatePostBody } from "@/consts";


export const handleCreateStory = (body: CreatePostBody, token: string) => {
  const result = CREATE_STORY(body, token);
  return result
}

export const handleGetStory = (id: string, token: string) => {
  const result = GET_STORY(id, token)
  return result
}

export const handleDeleteStory = async (id: string, token: string) => {
  const result = await DELETE_STORY(id, token);
  return result
}

export const handleGetViewers = async (id: string, token: string) => {
  const result = await GET_VIEWERS(id, token);
  return result
}

export const handleViewStory = async (id: string, token: string) => {
  const result = await VIEW_STORY(id, token);
  return result
}

export const handleGetStories = async (token: string) => {
  const result = await GET_FOLLOWING_STORIES(token);
  return result
}