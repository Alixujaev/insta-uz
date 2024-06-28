export const setAcceptVerify = (item: boolean) => {
  return {
    type: 'ACCEPT_VERIFY',
    payload: item
  }
}

export const updatePosts = () => {
  return {
    type: 'UPDATE_POSTS'
  }
}

export const areYouSureOpenAction = () => {
  return {
    type: 'ARE_YOU_SURE_OPEN'
  }
}

export const editModalOpenAction = () => {
  return {
    type: 'EDIT_MODAL_OPEN'
  }
}

export const aboutModalOpenAction = () => {
  return {
    type: 'ABOUT_MODAL_OPEN'
  }
}

export const editPostIdAction = (item: string) => {
  return {
    type: 'EDIT_POST_ID',
    payload: item
  }
}

export const authorNameAction = (item: string) => {
  return {
    type: 'AUTHOR_NAME',
    payload: item
  }
}