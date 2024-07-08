import { CREATE_CONVERSATION, DELETE_CONVERSATION, GET_CONVERSATIONS, GET_CONVERSATION_BY_USER_ID, GET_ONE_CONVERSATION } from "@/api/Conversations"

export const handleCreateConversation = async (token: string, id: string) => {
  const result = await CREATE_CONVERSATION(token, id);
  return result
}

export const handleGetConversations = async (token: string, id: string) => {
  const result = await GET_CONVERSATIONS(token, id);

  return result
}

export const handleGetOneConversation = async (token: string, id: string) => {
  const result = await GET_ONE_CONVERSATION(token, id);
  return result
}

export const handleConversationByUserId = async (token: string, id: string) => {
  const result = await GET_CONVERSATION_BY_USER_ID(token, id);
  return result
}

export const handleDelete = async (id: string, token: string) => {
  const result = await DELETE_CONVERSATION(token, id);
  return result
}