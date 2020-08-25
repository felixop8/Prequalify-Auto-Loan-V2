import { IQualificationResponseValues  } from '../types'

export const qualifiedLoanData: IQualificationResponseValues = {
  name: 'Car Loan prequalification resolution',
  description: 
  'Prequalification can help you determine whether you might be approved for a loan and an estimation of rates you might receive when shopping for a car.',
  prequalification_status: 1,
  resolution_message: 'Congratulations! Based on the information furnished by you, we are pleased to inform you that you pre-qualify for a car loan.',
  application_data: {
    price: '',
    make: '',
    model: '',
    income: '',
    credit: ''
  }
}

export const desqualifiedLoanData: IQualificationResponseValues = {
  name: 'Car Loan prequalification resolution',
  description: 
  'Prequalification can help you determine whether you might be approved for a loan and an estimation of rates you might receive when shopping for a car.',
  prequalification_status: 0,
  resolution_message: 'We are sorry to inform you that your application for a car loan has been rejected',
  application_data: {
    price: '',
    make: '',
    model: '',
    income: '',
    credit: ''
  }
}

