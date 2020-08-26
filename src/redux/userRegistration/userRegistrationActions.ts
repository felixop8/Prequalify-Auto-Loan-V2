import { NEW_LOGIN } from './userRegistrationTypes';
import { INewLoginValues } from '../../types';

export const newLogin = (content: INewLoginValues ) => ({
  type: NEW_LOGIN,
  payload: content
});

