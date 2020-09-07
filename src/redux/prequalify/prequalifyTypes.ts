export const FETCH_PREQUALIFY_REQUEST = "FETCH_PREQUALIFY_REQUEST";
export const FETCH_PREQUALIFY_SUCCESS = "FETCH_PREQUALIFY_SUCCESS";
export const FETCH_PREQUALIFY_ERROR = "FETCH_PREQUALIFY_ERROR";

// Represents reducer state object.
export interface IPrequalifyState {
  loading: boolean,
  error: string,
  status: "Approved" | "Declined" | null,
  message: string,
}


export interface IPrequalifyResponse {
  status: "Approved" | "Declined",
  message: string,
}


interface IFetchPrequalifyRequest {
  type: typeof FETCH_PREQUALIFY_REQUEST
}

interface IFetchPrequalifySuccess {
  type: typeof FETCH_PREQUALIFY_SUCCESS,
  payload: IPrequalifyResponse
}

interface IFetchPrequalifyError {
  type: typeof FETCH_PREQUALIFY_ERROR,
  payload: string
}



// Note that we can use TypeScript's Union Type here to express all possible actions.
// Example: export type IPrequalifyActionTypes = ISetPreQualifyAction; | IExampleAction
export type IPrequalifyActionTypes = IFetchPrequalifyRequest | IFetchPrequalifySuccess | IFetchPrequalifyError;