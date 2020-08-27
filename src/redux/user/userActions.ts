import { LOGGED_IN, IAccountState,  ILoginActions} from './userTypes';

export const loggedIn = (content: IAccountState ): ILoginActions => ({
  type: LOGGED_IN,
  payload: content
});

