import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Prequalify from './Prequalify';

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'


describe('Prequalify', () => {

    const initialState = {mockData: ''}
    const mockStore = configureStore()
    let store;



    const setup = () => {
        store = mockStore(initialState)

        const utils = render(<Provider store={store}><Prequalify /></Provider>)
        const input = utils.getByLabelText("Estimated Credit Score")
        return {
            input,
            ...utils,
        }
    }

    // Since I am not using Formik <Field /> component, and instead declaring each input field in pure html, I am only
    // going to test the validation on one field in that form. In a more robust application it is better
    // to have a Field reusable component which can be import in the test and pass different props and test it,
    // that way you always make sure the field in particular is going to behave in an intented way, and you can avoid
    // testing every single field in any form.


    test("should trigger a 'Required' validation error", async () => {
        const { input, findByTestId } = setup()
        // Call blur without inputting anything.
        fireEvent.blur(input);
        const requiredValidationError = await findByTestId("errors-creditScore");
        expect(requiredValidationError.innerHTML).toBe("Required");
    });

    test("should trigger a 'Min score value 300' validation error", async () => {
        const { input, findByTestId } = setup()

        // Call blur with a value lower than 300.
        fireEvent.change(input, {target: {value: 100}})
        fireEvent.blur(input);
        const minScoreValuevalidationError = await findByTestId("errors-creditScore");
        expect(minScoreValuevalidationError.innerHTML).toBe("Min score value 300");
    });

    test("should trigger a 'Max score value 850", async () => {
        const { input, findByTestId } = setup()

        // Call blur with a value higher than 850.
        fireEvent.change(input, {target: {value: 900}})
        fireEvent.blur(input);
        const maxScoreValuevalidationError = await findByTestId("errors-creditScore");
        expect(maxScoreValuevalidationError.innerHTML).toBe("Max score value 850");
    });
})

