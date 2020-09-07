import { combineReducers } from 'redux';

import registerUserReducer from './registerUser/registerUserReducer';
import prequalifyReducer from './prequalify/prequalifyReducer';

const rootReducer = combineReducers({ 
    registerUser: registerUserReducer, 
    prequalify: prequalifyReducer 
});

export default rootReducer;

// Use ReturnType to infer state shape from the rootReducer.
export type RootState = ReturnType<typeof rootReducer>