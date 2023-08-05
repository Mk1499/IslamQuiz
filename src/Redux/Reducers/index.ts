import {combineReducers} from 'redux';
import AuthReducer from './authReducer';
import FireConfigReducer from './fireConfigReducer';
export default combineReducers({
  auth: AuthReducer,
  fireConfig: FireConfigReducer,
});
