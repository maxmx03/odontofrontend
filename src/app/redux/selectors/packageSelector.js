export function selectPackages({ packageReducer }) {
  return packageReducer.data;
}

export function selectCollapsePackageCreate({ packageReducer }) {
  return packageReducer.stateCreate;
}

export function selectCollapsePackageEdit({ packageReducer }) {
  return packageReducer.stateEdit;
}

export function selectCreateResponse({ packageReducer }) {
  return packageReducer.packageFeedback;
}

export function selectProfileResponse({ packageReducer }) {
  return packageReducer.packageFeedback;
}

export function selectCodeResponse({ packageReducer }) {
  return packageReducer.packageFeedback;
}

export function selectDeleteResponse({ packageReducer }) {
  return packageReducer.packageFeedback;
}
