import { IPrequalifyActionTypes, IPrequalifyState, FETCH_PREQUALIFY_REQUEST, FETCH_PREQUALIFY_SUCCESS, FETCH_PREQUALIFY_ERROR } from './prequalifyTypes';


const initialState: IPrequalifyState = {
    loading: false,
    error: '',
    prequalify_status: null,
    prequalify_result_message: '',
    prequalify_data: {
      price: '',
      make: '',
      model: '',
      income: '',
      credit: ''
    }
}

export default function(state = initialState, action: IPrequalifyActionTypes): IPrequalifyState {
    switch (action.type) {
      case FETCH_PREQUALIFY_REQUEST: {
        return {
          ...state,
          loading: true
        };
      }
      case FETCH_PREQUALIFY_SUCCESS: {
        return {
          loading: false,
          ...action.payload,
          error: ''
        };
      }
      case FETCH_PREQUALIFY_ERROR: {
        return {
          loading: false,
          prequalify_status: 0,
          prequalify_result_message: '',
          prequalify_data: {
            price: '',
            make: '',
            model: '',
            income: '',
            credit: ''
          },
          error: action.payload
        };
      }
      default:
        return state;
    }
  }
  