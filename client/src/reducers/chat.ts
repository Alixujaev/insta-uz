import { MessageType } from "@/consts";

const initialState = {
  arrivalMessage: {} as MessageType
}

export const chatReducer = (state = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case 'ARRIVAL_MESSAGE':
      return {
        ...state,
        arrivalMessage: action.payload
      }
    default:
      return state
  }
}