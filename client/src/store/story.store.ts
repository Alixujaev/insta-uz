import { CREATE_STORY, GET_STORY } from "@/api/Story"
import { CreatePostBody } from "@/consts";


export const handleCreateStory = (body: CreatePostBody, token: string) => {
  const result = CREATE_STORY(body, token);
  return result
}

export const handleGetStory = (id: string, token: string) => {
  const result = GET_STORY(id, token)
  return result
}