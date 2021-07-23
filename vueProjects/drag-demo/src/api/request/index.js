import axios from 'axios';

const baseURL = '/api';
const timeout = 5000;

const config = {
  baseURL,
  timeout,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  params: {},
  data: {}
  // withCredentials: false, // 跨域请求时是否需要使用凭证
  // responseType: 'json' // 服务器响应的数据类型,可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
};

const instance = axios.create(config);

// 请求拦截
instance.interceptors.request.use(
  config => {
    if (config.method.toLocaleLowerCase() === 'get') {
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const get = (getConfig) =>
  new Promise((resolve, reject) => {
    instance.get(getConfig).then(
      res => {
        return resolve(res.data);
      },
      err => {
        return reject(err);
      }
    );
  });

const post = (postConfig) => {
  return new Promise((resolve, reject) => {
    instance.post(postConfig).then(
      res => {
        return resolve(res.data);
      },
      err => {
        return reject(err);
      }
    );
  });
};

function checkUrl(url) {
  if (url && url.slice(0, 1) !== '/') return '/' + url;
  else return url;
}

export default {
  get,
  post
};
