import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, IRegisterUserState, IUserActionTypes } from './registerUserTypes';

const initialState: IRegisterUserState  = {
    loading: false,
    error: '',
    status: null,
    message: '',
}

export default function(state = initialState, action: IUserActionTypes): IRegisterUserState {
    switch (action.type) {
      case REGISTER_USER_REQUEST: {
        return {
          ...state, 
          loading: true
        };
      }
      case REGISTER_USER_SUCCESS: {
        return {
          loading: false,
          ...action.payload,
          error: ''
        };
      }
      case REGISTER_USER_ERROR: {
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
  