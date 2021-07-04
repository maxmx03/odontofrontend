import axios from 'axios';
import Validator from '../../utils/validators/Validator';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

const error = {
  response: {
    status: 404,
  },
};

export default class Axios {
  static get(url, token) {
    if (Validator.isNotEmpty(url)) {
      return instance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return Promise.reject(error);
  }

  static post(url, body, token) {
    if (Validator.isNotEmpty(url) && Validator.isNotEmpty(body)) {
      return instance.post(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return Promise.reject(error);
  }

  static patch(url, body, token) {
    if (Validator.isNotEmpty(url) && Validator.isNotEmpty(body)) {
      return instance.patch(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return Promise.reject(error);
  }

  static delete(url, id, token) {
    if (Validator.isNotEmpty(url) && Validator.isNotEmpty(id)) {
      return instance.delete(`${url}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return Promise.reject(error);
  }
}
