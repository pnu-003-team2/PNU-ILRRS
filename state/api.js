import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import AsyncStorage from '@react-native-community/async-storage';

const ROOT = 'http://cbbeb9c0.ap.ngrok.io';

/**
 *
 * @param {string} path
 * @param {object} options
 */
export default async function api(path, options) {
  if (!path.startsWith('/')) {
    throw new Error('API path must start with "/"');
  }

  let {
    credentials = false,
    headers,
    method = 'GET',
    ...restOptions
  } = options;

  headers = { Accept: 'application/json' };

  if (credentials) {
    const token = await AsyncStorage.getItem('userToken');
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return axios({
    method,
    headers,
    url: ROOT + path,
    ...restOptions
  }).then((response) => ({
    ...response,
    data: camelcaseKeys(response.data, { deep: true }),
  }));
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
      return deferred({ data: { jwtToken: 'token' } });
    case '/course':
      return deferred({
        data: [
          {
            id: 0,
            uni_name: '부산대학교',
            depart_code: '10',
            depart_name: '전기컴퓨터공학부',
            class_code: 'CP10313',
            class_name: '운영체제',
            class_eng_name: 'Operating System',
            class_division: '063',
            professor_depart: 'professor_depart',
            professor_name: 'professor_name',
            limit_person: 50,
            time_table: '13:30-14:45',
            liberal_name: 'liberal_name',
          },
          {
            id: 1,
            uni_name: '부산대학교',
            depart_code: '10',
            depart_name: '전기컴퓨터공학부',
            class_code: 'CP10314',
            class_name: '인공지능',
            class_eng_name: 'Artificial Intelligence',
            class_division: '061',
            professor_depart: 'professor_depart',
            professor_name: 'professor_name',
            limit_person: 50,
            time_table: '15:00-16:15',
            liberal_name: 'liberal_name',
          }
        ]
      })
    default:
      throw new Error('fakeApi: Unexpected path');
  }
}
