export function selectUsers({ studentReducer }) {
  return studentReducer.data;
}

export function selectUserFeedback({ studentReducer }) {
  return studentReducer.studentFeedback;
}

export function selectCollapseUserCreate({ studentReducer }) {
  return studentReducer.stateCreate;
}

export function selectCollapseUserEdit({ studentReducer }) {
  return studentReducer.stateEdit;
}
