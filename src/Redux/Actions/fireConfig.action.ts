import {SetFireConfigData} from '../types';

export const setFireData = (config: any) => (dispatch: Function) => {
  dispatch({
    type: SetFireConfigData,
    payload: config,
  });
};
