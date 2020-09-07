export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_ERROR = "REGISTER_USER_ERROR";

// Represents reducer state object.
export interface IRegisterUserState {
  loading: boolean,
  error: string,
  status: number | null,
  message: string,
}

export interface IRegisterUserResponse {
    status: number | null,
    message: string,
}


interface IRegisterUserRequest {
  type: typeof REGISTER_USER_REQUEST
}

interface IRegisterUserSuccess {
  type: typeof REGISTER_USER_SUCCESS,
  payload: IRegisterUserResponse
}

interface IRegisterUserError {
  type: typeof REGISTER_USER_ERROR,
  payload: string
}

// Note that we can use TypeScript's Union Type here to express all possible actions.
export type IUserActionTypes = IRegisterUserRequest | IRegisterUserSuccess | IRegisterUserError;