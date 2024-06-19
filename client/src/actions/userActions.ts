import { CreateUser } from "@/consts"

export const createUser = (item:any) => {
  return {
    type: CreateUser.email,
    payload: item
  }
}