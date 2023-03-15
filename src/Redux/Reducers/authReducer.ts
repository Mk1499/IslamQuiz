/* eslint-disable prettier/prettier */
import ReduxAction from '../../Models/ReduxAction.model';
import {Logout, SetUserData, SetUserToken} from '../types';

const INITIAL_STATE = {
  userToken: '',
  userData: null,
};

const auth = (state = INITIAL_STATE, action: ReduxAction) => {
  switch (action.type) {
    case SetUserToken:
      return {
        ...state,
        userToken: action.payload,
      };

    case SetUserData:
      return {
        ...state,
        userData: action.payload,
      };
    case Logout:
      return {
        userToken: '',
        userData: null,
      };
    default:
      return state;
  }
};

export default auth;
