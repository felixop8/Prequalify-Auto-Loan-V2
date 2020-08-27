import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';

function Disqualified() {

    // Gets the prequalify result message from Redux store - reducer 'prequalify'.
    const selectPrequalifyResultMessage = (state: RootState) => state.prequalify.prequalify_result_message;
    const prequalifyResultMessage = useSelector(selectPrequalifyResultMessage);


    return (
        <div className="container">
            <div className="col-lg-12 text-center">
                <h1 className="mt-5">{ prequalifyResultMessage }</h1>
            </div>
        </div>
    )
}

export default Disqualified
