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
