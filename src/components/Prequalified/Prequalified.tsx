import React from 'react';
import { IPrequalifiedProps } from '../../types';
import RegisterUserForm from '../RegisterUserForm/RegisterUserForm';

function Prequalified({message}: IPrequalifiedProps) {
    return (
        <>
        <h1 className="mt-5">{ message }</h1>
        <RegisterUserForm />
        </>
    )
}

export default Prequalified
