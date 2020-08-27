export const LOGGED_IN = "LOGGED_IN";

export interface IAccountState {
    username: string,
    isLoggedIn: boolean,
}


interface ILoggedInAction {
    type: typeof LOGGED_IN
    payload: IAccountState
  }

// Note that we can use TypeScript's Union Type here to express all possible actions.
// Example: export type IPrequalifyActionTypes = ISetPreQualifyAction; | IExampleAction
export type ILoginActions = ILoggedInAction;