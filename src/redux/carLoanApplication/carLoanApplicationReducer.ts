import { ADD_APPLICATION_INFO } from './carLoanApplicationTypes';

const initialState = {
    name: '',
    description: '',
    prequalification_status: null,
    resolution_message: '',
    application_data: {
      price: '',
      make: '',
      model: '',
      income: '',
      credit: ''
    }
}

// Work in progress...
export default function(state = initialState, action: any) {
    switch (action.type) {
      case ADD_APPLICATION_INFO: {
        return {
          ...state, ...action.payload
        };
      }
      default:
        return state;
    }
  }
  