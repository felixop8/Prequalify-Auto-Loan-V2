import { createStore } from 'redux';
import combineReducers from './rootReducer';

const store = createStore(combineReducers,(window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
(window as any).__REDUX_DEVTOOLS_EXTENSION__());

export default store;


