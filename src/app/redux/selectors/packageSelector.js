export function selectUsers({ packageReducer }) {
  return packageReducer.data;
}

export function selectUserFeedback({ packageReducer }) {
  return packageReducer.packageFeedback;
}

export function selectCollapseUserCreate({ packageReducer }) {
  return packageReducer.stateCreate;
}

export function selectCollapseUserEdit({ packageReducer }) {
  return packageReducer.stateEdit;
}
