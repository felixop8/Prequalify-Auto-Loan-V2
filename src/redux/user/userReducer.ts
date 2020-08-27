import { LOGGED_IN } from './userTypes';
import { IAccountState, ILoginActions } from './userTypes';

const initialState: IAccountState  = {
    username: '',
    isLoggedIn: false,
}

export default function(state = initialState, action: ILoginActions): IAccountState {
    switch (action.type) {
      case LOGGED_IN: {
        return {isLoggedIn: true, username: action.payload.username};
      }
      default:
        return state;
    }
  }
  