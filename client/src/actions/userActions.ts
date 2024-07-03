
export const createUser = (item:any) => {
  return {
    type: 'SET_USER',
    payload: item
  }
}

export const setNotify = (item:any) => {
  return {
    type: 'SET_NOTIFY',
    payload: item
  }
}