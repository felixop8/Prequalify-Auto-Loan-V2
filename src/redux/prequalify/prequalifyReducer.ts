import { IPrequalifyActionTypes, IPrequalifyState, FETCH_PREQUALIFY_REQUEST, FETCH_PREQUALIFY_SUCCESS, FETCH_PREQUALIFY_ERROR } from './prequalifyTypes';


const initialState: IPrequalifyState = {
    loading: false,
    error: '',
    status: null,
    message: '',
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
          ...state,
          loading: false,
          error: action.payload
        };
      }
      default:
        return state;
    }
  }
  