import { CREATE_STORY } from "@/api/Story"
import { CreatePostBody } from "@/consts";


export const handleCreateStory = (body: CreatePostBody, token: string) => {
  const result = CREATE_STORY(body, token);
  return result
}