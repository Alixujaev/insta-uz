import { COMMENT, CREATE_POST, DELETE_POST, EDIT_POST, GET_COMMENTS, GET_ONE_POST, GET_USER_POSTS, LIKE, UNLIKE, UPLOAD } from "@/api/Post";
import { CommentBodyType, CreatePostBody } from "@/consts";

export const handleImageUpload = async (formData: any, token: string) => {
  const result = await UPLOAD(formData, token);
  return result;
}

export const handleCreate = async (body: CreatePostBody, token:string) => {
  const result = await CREATE_POST(body, token);
  return result
}

export const handleDelete = async (id: string, token: string) => {
  const result = await DELETE_POST(id, token);
  return result
}

export const handleGetPosts = async (id: string) => {
  const result = await GET_USER_POSTS(id);
  return result
}

export const handleGetPost = async (id: string) => {
  const result = await GET_ONE_POST(id);
  return result
}

export const handleLike = async (id: string, token: string) => {
  const result = await LIKE(id, token);
  return result
}

export const handleUnLike = async (id: string, token: string) => {
  const result = await UNLIKE(id, token);
  return result
}


export const handleComment = async (body: CommentBodyType, token: string) => {
  const result = await COMMENT(body, token);
  return result
}


export const handleGetComments = async (postId: string) => {
  const result = await GET_COMMENTS(postId);
  return result
}

export const handleEditPost = async (body: any, token: string, id: string) => {
  const result = await EDIT_POST(body, token, id);
  return result
}