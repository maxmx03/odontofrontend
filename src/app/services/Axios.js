import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.API_URL ?? 'http://localhost:3333',
});

export default class Axios {
  static get(opts = { url: '', token: '' }) {
    return instance.get(opts.url, {
      headers: {
        Authorization: `Bearer ${opts.token}`,
      },
    });
  }

  static post(opts = { url: '', body: '', token: '' }) {
    return instance.post(opts.url, opts.body, {
      headers: {
        Authorization: `Bearer ${opts.token}`,
      },
    });
  }

  static patch(opts = { url: '', body: '', token: '' }) {
    return instance.patch(opts.url, opts.body, {
      headers: {
        Authorization: `Bearer ${opts.token}`,
      },
    });
  }

  static delete(opts = { url: '', body: '', id: '', token: '' }) {
    return instance.delete(`${opts.url}${opts.id}`, {
      headers: {
        Authorization: `Bearer ${opts.token}`,
      },
      data: opts.body,
    });
  }
}
