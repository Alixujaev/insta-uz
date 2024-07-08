import { GET_CONVERSATIONS, GET_ONE_CONVERSATION } from "@/api/Conversations"

export const handleGetConversations = async (token: string, id: string) => {
  const result = await GET_CONVERSATIONS(token, id);

  return result
}

export const handleGetOneConversation = async (token: string, id: string) => {
  const result = await GET_ONE_CONVERSATION(token, id);
  return result
}