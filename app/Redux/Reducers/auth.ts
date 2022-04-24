import Action from '../action.model';
import {UserLogin} from '../types';
const INITIAL_STATE = {
  userData: {
    name: '',
  },
};

const user = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case UserLogin:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default user;