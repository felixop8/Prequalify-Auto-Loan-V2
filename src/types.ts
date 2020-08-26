export interface IAutoLoanFormValues {
    price: number | '',
    make: string,
    model: string,
    income: number | '',
    credit: number | ''
}

export interface IRegistrationFormValues {
    email: string,
    password: string
    confirmPassword: string
}

export interface IQualificationResponseValues {
    name: string,
    description: string,
    prequalification_status: number,
    resolution_message: string,
    application_data: IAutoLoanFormValues
}

export interface INewLoginValues {
    username: string,
    isUserLoggedIn: boolean,
    message: string
}
