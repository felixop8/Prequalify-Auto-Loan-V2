export const SET_PREQUALIFY_STATUS = "SET_PREQUALIFY_STATUS";

export interface IPrequalifyValuesState {
  price: number | '',
  make: string,
  model: string,
  income: number | '',
  credit: number | ''
}

export interface IPrequalifyState {
    prequalify_status: number,
    prequalify_result_message: string,
    prequalify_data: IPrequalifyValuesState
}

interface ISetPreQualifyAction {
    type: typeof SET_PREQUALIFY_STATUS
    payload: IPrequalifyState
  }

// Note that we can use TypeScript's Union Type here to express all possible actions.
// Example: export type IPrequalifyActionTypes = ISetPreQualifyAction; | IExampleAction
export type IPrequalifyActionTypes = ISetPreQualifyAction;