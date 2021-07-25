import request from './request';

// 示例
export function getCommonInfo() {
  return request.get({
    url: 'get/commonInfo',
    params: {
      token: '1111'
    }
  });
}

export function postInfo() {
  return request.post({
    url: 'submit/info',
    data: {
      name: '111',
      age: 20
    }
  });
}