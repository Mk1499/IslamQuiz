/* eslint-disable prettier/prettier */
import ReduxAction from '../../Models/ReduxAction.model';
import {SetFireConfigData} from '../types';

const INITIAL_STATE = {
  activeBuildNumber: 0,
  playStoreURL: '',
  facebookURL: '',
  showSocial: false,
  instagramURL: '',
};

const auth = (state = INITIAL_STATE, action: ReduxAction) => {
  switch (action.type) {
    case SetFireConfigData:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default auth;
