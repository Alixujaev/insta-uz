import { GET_NOTIFICATIONS } from "@/api/Notification"

export const handleGetNotification = (token: string) => {
  const result = GET_NOTIFICATIONS(token)
  return result
}