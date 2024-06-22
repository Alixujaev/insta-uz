import { USER_ACTIONS } from "@/consts"

export const createUser = (item:any) => {
  return {
    type: USER_ACTIONS.SET_USER,
    payload: item
  }
}