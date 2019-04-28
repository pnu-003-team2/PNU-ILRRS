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
        data: camelcaseKeys([
          {
            'id': 1432,
            'uni_name': '공과대학',
            'depart_code': '346712',
            'depart_name': '정보컴퓨터공학전공',
            'grade': 3,
            'class_code': 'CP20337',
            'code': 59,
            'class_name': '컴퓨터알고리즘',
            'class_eng_name': 'COMPUTER ALGORITHMS',
            'class_division': '전공필수',
            'score': 3,
            'theory': 3,
            'lab': 0,
            'professor_depart': '전기컴퓨터공학부',
            'professor_name': '조환규',
            'limit_person': 50,
            'time_table': '월 09:00(75) 201-6203,수 09:00(75) 201-6203',
            'liberal_name': '',
            'is_native': ' ',
            'is_remote': false,
            'updated_at': '2019-04-02T20:35:58.746Z',
            'created_at': '2019-04-02T20:35:58.746Z',
            'version': 1
          },
          {
            'id': 1436,
            'uni_name': '공과대학',
            'depart_code': '346712',
            'depart_name': '정보컴퓨터공학전공',
            'grade': 3,
            'class_code': 'CP26044',
            'code': 61,
            'class_name': '운영체제',
            'class_eng_name': 'OPERATING SYSTEMS',
            'class_division': '전공필수',
            'score': 3,
            'theory': 3,
            'lab': 0,
            'professor_depart': '전기컴퓨터공학부',
            'professor_name': '안성용 ',
            'limit_person': 50,
            'time_table': '월 10:30(75) 201-6515,수 10:30(75) 201-6515',
            'liberal_name': '',
            'is_native': ' ',
            'is_remote': false,
            'updated_at': '2019-04-02T20:35:58.754Z',
            'created_at': '2019-04-02T20:35:58.754Z',
            'version': 1
          },
          {
            'id': 1438,
            'uni_name': '공과대학',
            'depart_code': '346712',
            'depart_name': '정보컴퓨터공학전공',
            'grade': 3,
            'class_code': 'CP33987',
            'code': 2,
            'class_name': '소프트웨어설계및실험',
            'class_eng_name': 'COMPUTER SOFTWARE DESIGN & LAB',
            'class_division': '전공필수',
            'score': 2,
            'theory': 0,
            'lab': 4,
            'professor_depart': '전기컴퓨터공학부',
            'professor_name': '권혁철',
            'limit_person': 40,
            'time_table': '목 18:00-22:00 201-6409',
            'liberal_name': '',
            'is_native': ' ',
            'is_remote': false,
            'updated_at': '2019-04-02T20:35:58.759Z',
            'created_at': '2019-04-02T20:35:58.759Z',
            'version': 1
          },
          {
            'id': 1440,
            'uni_name': '공과대학',
            'depart_code': '346712',
            'depart_name': '정보컴퓨터공학전공',
            'grade': 3,
            'class_code': 'CP26207',
            'code': 61,
            'class_name': '컴퓨터구조',
            'class_eng_name': 'COMPUTER ARCHITECTURE',
            'class_division': '전공필수',
            'score': 3,
            'theory': 3,
            'lab': 0,
            'professor_depart': '전기컴퓨터공학부',
            'professor_name': '김호원',
            'limit_person': 50,
            'time_table': '월 15:00(75) 201-6203,수 15:00(75) 201-6203',
            'liberal_name': '',
            'is_native': ' ',
            'is_remote': false,
            'updated_at': '2019-04-02T20:35:58.760Z',
            'created_at': '2019-04-02T20:35:58.760Z',
            'version': 1
          },
          {
            'id': 1449,
            'uni_name': '공과대학',
            'depart_code': '346712',
            'depart_name': '정보컴퓨터공학전공',
            'grade': 4,
            'class_code': 'CP26105',
            'code': 60,
            'class_name': '프로그래밍언어론',
            'class_eng_name': 'PROGRAMMING LANGUAGE PRINCIPLES',
            'class_division': '전공필수',
            'score': 3,
            'theory': 3,
            'lab': 0,
            'professor_depart': '전기컴퓨터공학부',
            'professor_name': '염근혁',
            'limit_person': 50,
            'time_table': '화 13:30(75) 201-6514,목 13:30(75) 201-6514',
            'liberal_name': '',
            'is_native': ' ',
            'is_remote': false,
            'updated_at': '2019-04-02T20:35:58.774Z',
            'created_at': '2019-04-02T20:35:58.774Z',
            'version': 1
          },
          {
            'id': 1453,
            'uni_name': '공과대학',
            'depart_code': '346712',
            'depart_name': '정보컴퓨터공학전공',
            'grade': 4,
            'class_code': 'CP33004',
            'code': 3,
            'class_name': '컴퓨터응용설계및실험',
            'class_eng_name': 'APPLIED COMPUTER DESIGN & LAB',
            'class_division': '전공필수',
            'score': 2,
            'theory': 0,
            'lab': 4,
            'professor_depart': '전기컴퓨터공학부',
            'professor_name': '채흥석',
            'limit_person': 30,
            'time_table': '화 18:00-22:00 201-6408',
            'liberal_name': '',
            'is_native': ' ',
            'is_remote': false,
            'updated_at': '2019-04-02T20:35:58.782Z',
            'created_at': '2019-04-02T20:35:58.782Z',
            'version': 1
          },
          {
            'id': 1462,
            'uni_name': '공과대학',
            'depart_code': '346712',
            'depart_name': '정보컴퓨터공학전공',
            'grade': 4,
            'class_code': 'CP21845',
            'code': 60,
            'class_name': '인공지능',
            'class_eng_name': 'ARTIFICIAL INTELLIGENCE',
            'class_division': '전공선택',
            'score': 3,
            'theory': 3,
            'lab': 0,
            'professor_depart': '전기컴퓨터공학부',
            'professor_name': '류광렬',
            'limit_person': 40,
            'time_table': '화 15:00(75) 201-6514,목 15:00(75) 201-6514',
            'liberal_name': '',
            'is_native': ' ',
            'is_remote': false,
            'updated_at': '2019-04-02T20:35:58.793Z',
            'created_at': '2019-04-02T20:35:58.793Z',
            'version': 1
          },
        ], { deep: true }),
      });
    default:
      throw new Error('fakeApi: Unexpected path');
  }
}
