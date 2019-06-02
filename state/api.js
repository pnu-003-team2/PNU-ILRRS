import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import AsyncStorage from '@react-native-community/async-storage';

const ROOT = 'http://5d7ce98b.ap.ngrok.io';
const faked = false;

/**
 *
 * @param {string} path
 * @param {object} options
 */
export default async function api(path, options) {
  if (!path.startsWith('/')) {
    throw new Error('API path must start with "/"');
  }

  if (faked) {
    return fakeApi(path, options);
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
    ...restOptions,
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
      return deferred({
        data: camelcaseKeys({
          'jwtToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIwMTIyNDQ1MiIsImlhdCI6MTU1OTI3ODI4MSwiZXhwIjoxNTU5MzY0NjgxfQ.i4oHBMZua4cjazKYsFOimiyXltUJn1uggis9fVlq00E',
          'expireDate': '2019-06-01T04:51:21.640Z',
        }),
      });
    case '/user':
      return deferred({
        data: camelcaseKeys({
          'id': '201224452',
          'name': '노태환',
          'sendbird_access_token': '4dc8297988e6378ee850cd4697e1dc74fc7c3e90',
        }),
      });
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
            'channel_url': 'sendbird_group_channel_50889_fae9ed76d457a2b59da251d2348cc83536cae9d6',
            'updated_at': '2019-04-28T00:54:01.000Z',
            'created_at': '2019-04-02T20:35:58.746Z',
            'version': 2,
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
            'channel_url': 'sendbird_group_channel_50889_77f0db874be2589151d42a9d250442da36498e7e',
            'updated_at': '2019-04-28T00:54:02.000Z',
            'created_at': '2019-04-02T20:35:58.754Z',
            'version': 2,
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
            'channel_url': 'sendbird_group_channel_50889_f4ab5296bac6e0fee092653a617010638f48b94c',
            'updated_at': '2019-04-28T00:54:03.000Z',
            'created_at': '2019-04-02T20:35:58.759Z',
            'version': 2,
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
            'channel_url': 'sendbird_group_channel_50889_6c4c7a24ddbb96d8a72eefe08174a1ba1c42fb4e',
            'updated_at': '2019-04-28T00:54:04.000Z',
            'created_at': '2019-04-02T20:35:58.760Z',
            'version': 2,
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
            'channel_url': 'sendbird_group_channel_50889_4c8fa4eee56a4ef7e8b1f571ca4538211dc6ac21',
            'updated_at': '2019-04-28T00:54:06.000Z',
            'created_at': '2019-04-02T20:35:58.774Z',
            'version': 2,
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
            'channel_url': 'sendbird_group_channel_50889_943a44c1a54db59a86ce820ae111f69a31ad2c83',
            'updated_at': '2019-04-28T00:54:07.000Z',
            'created_at': '2019-04-02T20:35:58.782Z',
            'version': 2,
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
            'channel_url': 'sendbird_group_channel_50889_8c97d910375cd0accc5f3b7d24d1fdd0e7f0904e',
            'updated_at': '2019-04-28T00:54:09.000Z',
            'created_at': '2019-04-02T20:35:58.793Z',
            'version': 2,
          },
        ], { deep: true }),
      });
    default:
      throw new Error('fakeApi: Unexpected path');
  }
}
