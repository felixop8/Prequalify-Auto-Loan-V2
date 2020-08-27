import { SET_PREQUALIFY_STATUS, IPrequalifyActionTypes, IPrequalifyState } from './prequalifyTypes';


const initialState: IPrequalifyState = {
    prequalify_status: 0,
    prequalify_result_message: '',
    prequalify_data: {
      price: '',
      make: '',
      model: '',
      income: '',
      credit: ''
    }
}

export default function(state = initialState, action: IPrequalifyActionTypes): IPrequalifyState {
    switch (action.type) {
      case SET_PREQUALIFY_STATUS: {
        return {
          ...state, ...action.payload
        };
      }
      default:
        return state;
    }
  }
  