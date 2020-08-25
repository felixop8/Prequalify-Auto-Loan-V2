import { createStore } from 'redux';
import carLoanApplicationReducer from './carLoanApplication/carLoanApplicationReducer';

const store = createStore(carLoanApplicationReducer,(window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
(window as any).__REDUX_DEVTOOLS_EXTENSION__());

export default store;


