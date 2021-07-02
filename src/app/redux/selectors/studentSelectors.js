export function selectStudents({ studentReducer }) {
  return studentReducer.data;
}

export function selectCollapseStudentCreate({ studentReducer }) {
  return studentReducer.stateCreate;
}

export function selectCollapseStudentEdit({ studentReducer }) {
  return studentReducer.stateEdit;
}

export function selectCreateResponse({ studentReducer }) {
  return studentReducer.createStatus;
}

export function selectProfileResponse({ studentReducer }) {
  return studentReducer.updateProfileStatus;
}

export function selectEmailResponse({ studentReducer }) {
  return studentReducer.updateEmailStatus;
}

export function selectPasswordResponse({ studentReducer }) {
  return studentReducer.updatePasswordStatus;
}

export function selectDeleteResponse({ studentReducer }) {
  return studentReducer.deleteAccountStatus;
}
