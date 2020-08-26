import { combineReducers } from 'redux';

import userRegistrationReducer from './userRegistration/userRegistrationReducer';
import carLoanApplicationReducer from './carLoanApplication/carLoanApplicationReducer';

export default combineReducers({ userLogin: userRegistrationReducer, applicationState: carLoanApplicationReducer });