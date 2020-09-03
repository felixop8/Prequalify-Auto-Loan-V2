export const FETCH_PREQUALIFY_REQUEST = "FETCH_PREQUALIFY_REQUEST";
export const FETCH_PREQUALIFY_SUCCESS = "FETCH_PREQUALIFY_SUCCESS";
export const FETCH_PREQUALIFY_ERROR = "FETCH_PREQUALIFY_ERROR";

export interface IPrequalifyValuesState {
  price: number | '',
  make: string,
  model: string,
  income: number | '',
  credit: number | ''
}

export interface IPrequalifyState {
  loading: boolean,
  error: string,
  prequalify_status: number | null,
  prequalify_result_message: string,
  prequalify_data: IPrequalifyValuesState
}

export interface IPrequalifySuccess {
  prequalify_status: number,
  prequalify_result_message: string,
  prequalify_data: IPrequalifyValuesState
}


interface IFetchPrequalifyRequest {
  type: typeof FETCH_PREQUALIFY_REQUEST
}

interface IFetchPrequalifySuccess {
  type: typeof FETCH_PREQUALIFY_SUCCESS,
  payload: IPrequalifySuccess
}

interface IFetchPrequalifyError {
  type: typeof FETCH_PREQUALIFY_ERROR,
  payload: string
}



// Note that we can use TypeScript's Union Type here to express all possible actions.
// Example: export type IPrequalifyActionTypes = ISetPreQualifyAction; | IExampleAction
export type IPrequalifyActionTypes = IFetchPrequalifyRequest | IFetchPrequalifySuccess | IFetchPrequalifyError;