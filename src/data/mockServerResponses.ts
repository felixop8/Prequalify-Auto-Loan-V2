import { IPrequalifyResponse  } from '../redux/prequalify/prequalifyTypes';

export const prequalifyResponseData: IPrequalifyResponse = {
  status: "Approved",
  message: "Congratulations! Based on the information furnished by you, we are pleased to inform you that you pre-qualify for a car loan.",
}

export const disqualifyResponseData: IPrequalifyResponse = {
  status: "Declined",
  message: "Unfortunately you don't qualify for a car loan. Please contact a customer service representative +1(503)111-111",
}