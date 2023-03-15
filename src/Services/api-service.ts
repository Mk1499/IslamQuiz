import axios from 'axios';
import {getActiveLang} from '../translate';

const baseURL = 'https://iquiz-server.onrender.com';
// const baseURL = 'http://192.168.1.8:9000';
export const get = (url: string) => {
  return axios.get(baseURL + url, {
    headers: {
      lang: getActiveLang(),
    },
  });
};

export const post = (url: string, body: any) => {
  return axios.post(baseURL + url, body, {
    headers: {
      lang: getActiveLang(),
    },
  });
};

export const del = (url: string) => {
  return axios.delete(baseURL + url, {
    headers: {
      lang: getActiveLang(),
    },
  });
};
