import jwtDecode from 'jwt-decode';
import {SetUserData, SetUserToken} from '../types';

export const loginAction = (token: string) => (dispatch: Function) => {
  console.log('Token : ', token);
  const userData = jwtDecode(token);
  console.log('user Data : ', userData);

  dispatch({
    type: SetUserToken,
    payload: token,
  });

  dispatch({
    type: SetUserData,
    payload: userData,
  });
};
