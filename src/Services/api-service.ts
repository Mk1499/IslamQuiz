import axios from 'axios';
import StorageKeys from '../Config/StorageKeys';
import {getActiveLang} from '../translate';
import Storage from './storage-service';

// const baseURL = 'https://iquiz-server.onrender.com';
const baseURL = 'http://192.168.1.2:9000';
export const get = async (url: string, authReq = true) => {
  let headers;
  if (authReq) {
    headers = {
      lang: getActiveLang(),
      Authorization: await Storage.getItem(StorageKeys.userToken),
    };
  } else {
    headers = {
      lang: getActiveLang(),
    };
  }
  return axios.get(baseURL + url, {
    headers,
  });
};

export const post = async (
  url: string,
  body: any,
  authReq = true,
  token?: string,
) => {
  let headers;
  if (authReq) {
    headers = {
      lang: getActiveLang(),
      Authorization: token || (await Storage.getItem(StorageKeys.userToken)),
    };
  } else {
    headers = {
      lang: getActiveLang(),
    };
  }
  return axios.post(baseURL + url, body, {
    headers,
  });
};

export const del = (url: string) => {
  return axios.delete(baseURL + url, {
    headers: {
      lang: getActiveLang(),
    },
  });
};
