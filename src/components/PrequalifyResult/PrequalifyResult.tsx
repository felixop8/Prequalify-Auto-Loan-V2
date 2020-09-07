import React from 'react';
import { RootState } from '../../redux/rootReducer';
import { useSelector } from 'react-redux';
import Prequalified from '../Prequalified/Prequalified';
import Disqualified from '../Disqualified/Disqualified';

function PrequalifyResult() {
    // Gets the prequalify result from Redux store - reducer 'prequalify'.
    const { status, message } = useSelector((state: RootState) => state.prequalify);

    return (
        <div className="container">
            <div className="col-lg-12 text-center">
            {status === "Approved"
                ? <Prequalified message={message} />
                : <Disqualified message={message} />
            }
            </div>
        </div>
    )
    
}

export default PrequalifyResult
