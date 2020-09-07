import { IPrequalifyResponse, FETCH_PREQUALIFY_REQUEST, FETCH_PREQUALIFY_SUCCESS, FETCH_PREQUALIFY_ERROR } from './prequalifyTypes';
import { IPrequalifyFormValues } from '../../types';
import axios from 'axios';

export const fetchPrequalifyRequest = {
  type: FETCH_PREQUALIFY_REQUEST
}

export const fetchPrequalifySuccess = (response:IPrequalifyResponse) => ({
  type: FETCH_PREQUALIFY_SUCCESS,
  payload: response
})

export const fetchPrequalifyError = (error:String) => ({
  type: FETCH_PREQUALIFY_ERROR,
  payload: error
})

export const fetchPrequalify = (formValues: IPrequalifyFormValues) => {
  return (dispatch: any) => {
    // Inform that the API call is starting.
    dispatch(fetchPrequalifyRequest); 
    axios.get("api/prequalify", { params: formValues })
        // Here, we update the app state with the results of the API call.
        // setTimeout helps replicate latency in the request.
      .then(response => {setTimeout(() => {
        dispatch(fetchPrequalifySuccess(response.data))}, 3000) })
      .catch(error => dispatch(fetchPrequalifyError(error.message)))
  }
}