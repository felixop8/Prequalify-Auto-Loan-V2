import React from 'react';
import { IDisqualifiedProps } from '../../types';

function Disqualified({message}: IDisqualifiedProps) {
    return <><h1 className="mt-5">{ message }</h1></>
}

export default Disqualified
