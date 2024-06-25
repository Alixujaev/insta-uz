import { CREATE_POST, GET_USER_POSTS, UPLOAD } from "@/api/Post";
import { CreatePostBody } from "@/consts";

export const handleImageUpload = async (formData: any, token: string) => {
  const result = await UPLOAD(formData, token);
  return result;
}

export const handleCreate = async (body: CreatePostBody, token:string) => {
  const result = await CREATE_POST(body, token);

  return result
}

export const handleGetPosts = async (id: string) => {
  const result = await GET_USER_POSTS(id);
  return result
}

