export interface IPrequalifyFormValues {
    price: number | '',
    make: string,
    model: string,
    income: number | '',
    credit: number | ''
}

export interface IRegisterUserFormValues {
    email: string,
    password: string
    confirmPassword: string
}

export interface IPrequalifiedProps {
    message: string
}

export interface IDisqualifiedProps {
    message: string
}