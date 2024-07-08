import { DELETE_CONVERSATION, GET_CONVERSATIONS, GET_ONE_CONVERSATION } from "@/api/Conversations"

export const handleGetConversations = async (token: string, id: string) => {
  const result = await GET_CONVERSATIONS(token, id);

  return result
}

export const handleGetOneConversation = async (token: string, id: string) => {
  const result = await GET_ONE_CONVERSATION(token, id);
  return result
}

export const handleDelete = async (id: string, token: string) => {
  const result = await DELETE_CONVERSATION(token, id);
  return result
}