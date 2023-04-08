import jwtDecode from 'jwt-decode';
import {SetUserData, SetUserToken} from '../types';

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
export const syncUserDate = (token: string) => (dispatch: Function) => {};
