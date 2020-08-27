import { SET_PREQUALIFY_STATUS, IPrequalifyActionTypes, IPrequalifyState } from './prequalifyTypes';


export const setPreQualificationStatus = (content: IPrequalifyState ): IPrequalifyActionTypes => ({
  type: SET_PREQUALIFY_STATUS,
  payload: content
});

