import {createStore, applyMiddleware} from 'redux';
import MainReducer from './Reducers/index';

import thunk from 'redux-thunk';

const store = createStore(MainReducer, applyMiddleware(thunk));

export default store;
