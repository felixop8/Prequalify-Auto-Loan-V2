export interface IPrequalifyValues {
    price: number | '',
    make: string,
    model: string,
    income: number | '',
    credit: number | ''
}

export interface ICreateAccountValues {
    email: string,
    password: string
    confirmPassword: string
}

export interface IPrequalifyStatusValues {
    prequalify_status: number,
    prequalify_result_message: string,
    prequalify_data: IPrequalifyValues
}

export interface IAccountValues {
    username: string,
    isLoggedIn: boolean
}
