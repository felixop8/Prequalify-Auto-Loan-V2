import { IPrequalifyState, FETCH_PREQUALIFY_REQUEST, FETCH_PREQUALIFY_SUCCESS, FETCH_PREQUALIFY_ERROR } from './prequalifyTypes';
import { IPrequalifyFormValues } from '../../types';
import axios from 'axios';


export const fetchPrequalifyRequest = () => ({
  type: FETCH_PREQUALIFY_REQUEST
})

export const fetchPrequalifySuccess = (response:IPrequalifyState) => ({
  type: FETCH_PREQUALIFY_SUCCESS,
  payload: response
})

export const fetchPrequalifyError = (error:String) => ({
  type: FETCH_PREQUALIFY_ERROR,
  payload: error
})

export const fetchPrequalify =  (formValues: IPrequalifyFormValues) => {
  return (dispatch: any) => {
    dispatch(fetchPrequalifyRequest()); 
    axios.get("api/prequalify", { params: formValues })
        .then(response => {
          setTimeout(() => {
            dispatch(fetchPrequalifySuccess(response.data.data));
          },5000) 
        }).catch(error => {
          dispatch(fetchPrequalifyError(error.message))
        })
  }
}