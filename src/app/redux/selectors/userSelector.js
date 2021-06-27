export function selectUsers({ userReducer }) {
  return userReducer.data;
}

export function selectUserFeedback({ userReducer }) {
  return userReducer.userFeedback;
}

export function selectCollapseUserCreate({ userReducer }) {
  return userReducer.stateCreate;
}

export function selectCollapseUserEdit({ userReducer }) {
  return userReducer.stateEdit;
}
