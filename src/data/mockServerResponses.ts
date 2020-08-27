import { IPrequalifyStatusValues  } from '../types'

export const qualifiedLoanData: IPrequalifyStatusValues = {
  prequalify_status: 1,
  prequalify_result_message: 'Congratulations! Based on the information furnished by you, we are pleased to inform you that you pre-qualify for a car loan.',
  prequalify_data: {
    price: '',
    make: '',
    model: '',
    income: '',
    credit: ''
  }
}

export const desqualifiedLoanData: IPrequalifyStatusValues = {
  prequalify_status: 0,
  prequalify_result_message: "Unfortunately you don't qualify for a car loan. Please contact a customer service representative +1(503)111-111",
  prequalify_data: {
    price: '',
    make: '',
    model: '',
    income: '',
    credit: ''
  }
}

