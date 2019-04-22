import axios from 'axios';

const ROOT = 'https://76c53d09.ap.ngrok.io';

/**
 *
 * @param {string} path
 * @param {object} data
 * @param {object} options
 */
export default function api(path, options) {
  if (!path.startsWith('/')) {
    throw new Error('API path must start with "/"');
  }

  const {
    method = 'GET',
    ...restOptions
  } = options;

  return axios({
    method,
    headers: {
      Accept: 'application/json',
    },
    url: ROOT + path,
    ...restOptions
  });
}
