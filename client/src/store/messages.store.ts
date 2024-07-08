import { CREATE_MESSAGE } from "@/api/Messages"
import { MessageBody } from "@/consts"

export const handleSendMessage = async (body:MessageBody, token:string) => {
  const result = await CREATE_MESSAGE(body, token)

  return result
}