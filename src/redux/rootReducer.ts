import { combineReducers } from 'redux';

import userReducer from './user/userReducer';
import prequalifyReducer from './prequalify/prequalifyReducer';

const rootReducer = combineReducers({ 
    user: userReducer, 
    prequalify: prequalifyReducer 
});

export default rootReducer;

// Use ReturnType to infer state shape from the rootReducer.
export type RootState = ReturnType<typeof rootReducer>