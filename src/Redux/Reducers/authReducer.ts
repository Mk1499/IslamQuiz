/* eslint-disable prettier/prettier */
import ReduxAction from '../../Models/ReduxAction.model';
import {Logout, SetUserData, SetUserToken, SyncData} from '../types';

const INITIAL_STATE = {
  userToken: '',
  userData: null,
  syncingUserData: false,
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
    case SyncData:
      return {
        ...state,
        syncingUserData: action.payload,
      };
    default:
      return state;
  }
};

export default auth;
