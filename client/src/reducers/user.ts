const initialState = {
  user: {},
  notify: ''
}

export const userReducer = (state = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }
    case 'SET_NOTIFY':
      return {
        ...state,
        notify: action.payload
      }
    default:
      return state
  }
}