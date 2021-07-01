export function selectUser({ authReducer }) {
  return authReducer.user;
}

export function selectAuthResponse({ authReducer }) {
  return authReducer.authStatus;
}

export function selectForgetResponse({ authReducer }) {
  return authReducer.forgetPassStatus;
}
