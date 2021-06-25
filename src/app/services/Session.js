import Validator from '../../utils/validators/Validator';

export default class Session {
  static get(key) {
    const authCache = sessionStorage.getItem(key);
    if (Validator.isNotEmpty(authCache)) {
      return JSON.parse(authCache);
    }

    return null;
  }

  static set(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  static reset(key) {
    sessionStorage.removeItem(key);
  }
}
