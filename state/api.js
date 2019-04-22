import axios from 'axios';

const ROOT = 'https://76c53d09.ap.ngrok.io';

/**
 *
 * @param {string} path
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


/**
 * Create deferred promise scheduled to be resolved
 * @todo Remove this mocking
 * @param {*} params - Fake data for API mocking
 */
const deferred = (params) =>
  new Promise(r => setTimeout(() => r(params), 1500));

/**
 * Call API with fake mocking data
 * @todo Remove this mocking
 * @param {string} path
 * @param {object} options
 * @returns {Promise}
 */
export function fakeApi(path, options) {
  switch (path) {
    case '/user/login':
      return deferred({ data: 'Token' });
    default:
      throw new Error('fakeApi: Unexpected path');
  }
}
