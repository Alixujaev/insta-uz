const initialState = {
  acceptVerify: false,
  isUpdatePosts: false,
  areYouSureOpen: false,
  editModalOpen: false,
  aboutModalOpen: false,
  editPostId: '',
  authorName: ''
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

    case 'ARE_YOU_SURE_OPEN':
      return {
        ...state,
        areYouSureOpen: !state.areYouSureOpen
      }

    case 'EDIT_MODAL_OPEN':
      return {
        ...state,
        editModalOpen: !state.editModalOpen
      }

    case 'ABOUT_MODAL_OPEN':
      return {
        ...state,
        aboutModalOpen: !state.aboutModalOpen
      }

    case 'EDIT_POST_ID':
      return {
        ...state,
        editPostId: action.payload
      }

    case 'AUTHOR_NAME':
      return {
        ...state,
        authorName: action.payload
      }

    default:
      return state
  }
}