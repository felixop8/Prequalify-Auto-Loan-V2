import { ADD_APPLICATION_INFO } from './carLoanApplicationTypes';
import { IAutoLoanFormValues } from '../../types';


export const addApplicationInfo = (content: IAutoLoanFormValues ) => ({
  type: ADD_APPLICATION_INFO,
  payload: content
});

