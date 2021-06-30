export function selectUser({ authReducer }) {
  return authReducer.user;
}

export function selectAuthFeedback({ authReducer }) {
  return authReducer.authFeedback;
}
