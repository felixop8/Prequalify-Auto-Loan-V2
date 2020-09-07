import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, IRegisterUserResponse } from './registerUserTypes';
import { IRegisterUserFormValues } from '../../types';
import axios from 'axios';

export const registerUserRequest = {
  type: REGISTER_USER_REQUEST
}

export const registerUserSuccess = (response:IRegisterUserResponse) => ({
  type: REGISTER_USER_SUCCESS,
  payload: response
})

export const registerUserError = (error:String) => ({
  type: REGISTER_USER_ERROR,
  payload: error
})

export const registerUser = (formValues: IRegisterUserFormValues) => {
  return (dispatch: any) => {
    // Inform that the API call is starting.
    dispatch(registerUserRequest); 
    axios.post("api/register/user", { params: formValues })
        // Here, we update the app state with the results of the API call.
      .then(response => {setTimeout(() => {
        dispatch(registerUserSuccess({...response.data, status: response.status}))}, 3000) })
      .catch(error => dispatch(registerUserError(error.message)))
  }
}