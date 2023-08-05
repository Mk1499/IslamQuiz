import jwtDecode from 'jwt-decode';
import StorageKeys from '../../Config/StorageKeys';
import {get} from '../../Services/api-service';
import StorageService from '../../Services/storage-service';
import {errorHandler} from '../../Services/toast-service';
import {SetUserData, SetUserToken, SyncData} from '../types';

export const setTokenAction = (token: string) => (dispatch: Function) => {
  const userData = jwtDecode(token);
  dispatch({
    type: SetUserToken,
    payload: token,
  });
  dispatch({
    type: SetUserData,
    payload: userData,
  });
};

// need to sync user data with backend after action like submit quiz happened
export const syncUserData = (id: string) => (dispatch: Function) => {
  let url = `/user/sync/${id}`;
  dispatch({
    type: SyncData,
    payload: true,
  });
  get(url, true)
    .then(({data}) => {
      const userData = jwtDecode(data);
      StorageService.setItem(StorageKeys.userToken, data);
      dispatch({
        type: SetUserToken,
        payload: data,
      });
      dispatch({
        type: SetUserData,
        payload: userData,
      });
    })
    .catch(err => {
      console.log('Err : ', err);
      errorHandler('');
    })
    .finally(() => {
      dispatch({
        type: SyncData,
        payload: false,
      });
    });
};
