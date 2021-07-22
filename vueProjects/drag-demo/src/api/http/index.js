import axios from 'axios';

const baseURL = '/api';
const timeout = 5000;

const instance = axios.create({
  baseURL,
  timeout
});

instance.interceptors.request.use(
  config => {
    // do something
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
