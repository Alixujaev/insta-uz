const initialState = {
  acceptVerify: false,
  isUpdatePosts: false
}

export const settingsReducer = (state = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case 'ACCEPT_VERIFY': 
      return {
        ...state,
        acceptVerify: action.payload
      }

    case 'UPDATE_POSTS':
      return {
        ...state,
        isUpdatePosts: !state.isUpdatePosts
      }
    default:
      return state
  }
}