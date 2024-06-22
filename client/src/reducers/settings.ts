const initialState = {
  acceptVerify: false

}

export const settingsReducer = (state = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case 'ACCEPT_VERIFY': 
      return {
        ...state,
        acceptVerify: action.payload
      }


    default:
      return state
  }
}