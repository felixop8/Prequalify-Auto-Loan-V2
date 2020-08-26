import { NEW_LOGIN } from './userRegistrationTypes';
import { INewLoginValues } from '../../types';

const initialState: INewLoginValues  = {
    username: '',
    isUserLoggedIn: false,
    message: ''
}

export default function(state = initialState, action: any) {
    switch (action.type) {
      case NEW_LOGIN: {
        return {
          ...state, ...action.payload
        };
      }
      default:
        return state;
    }
  }
  