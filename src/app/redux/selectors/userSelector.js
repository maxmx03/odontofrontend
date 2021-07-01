export function selectUsers({ userReducer }) {
  return userReducer.data;
}

export function selectCollapseUserCreate({ userReducer }) {
  return userReducer.stateCreate;
}

export function selectCollapseUserEdit({ userReducer }) {
  return userReducer.stateEdit;
}

export function selectCreateResponse({ userReducer }) {
  return userReducer.createStatus;
}

export function selectProfileResponse({ userReducer }) {
  return userReducer.updateProfileStatus;
}

export function selectEmailResponse({ userReducer }) {
  return userReducer.updateEmailStatus;
}

export function selectPasswordResponse({ userReducer }) {
  return userReducer.updatePasswordStatus;
}

export function selectDeleteResponse({ userReducer }) {
  return userReducer.deleteAccountStatus;
}
