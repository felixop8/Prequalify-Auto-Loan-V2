import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import PrequalifyForm from './PrequalifyForm';

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'


describe('PrequalifyForm', () => {
    afterEach(cleanup);

    const initialState = {mockData: ''}
    const mockStore = configureStore()
    let store;



    const setup = () => {
        store = mockStore(initialState)

        const utils = render(<Provider store={store}><PrequalifyForm /></Provider>)
        
        // implicit assertions
        // because getBy search variant would throw error 
        // if element wouldn’t be there
        const creditScoreInput = utils.getByLabelText("Estimated Credit Score");
        const purchasePriceInput = utils.getByLabelText("Auto Purchase Price");
        const autoMakeInput = utils.getByLabelText("Auto Make");
        const autoModelInput = utils.getByLabelText("Auto Model");
        const yearlyIncomeInput = utils.getByLabelText("Stimated Yearly Income");


        // screen.debug()
        return {
            purchasePriceInput,
            autoMakeInput,
            autoModelInput,
            yearlyIncomeInput,
            creditScoreInput,
            ...utils,
        }
    }

    // Since I am not using Formik <Field /> component, and instead declaring each input field in pure html, I am only
    // going to test the validation on one field in that form. In a more robust application it is better
    // to have a Field reusable component which can be import in the test and pass different props and test it,
    // that way you always make sure the field in particular is going to behave in an intented way, and you can avoid
    // testing every single field in any form.


    test("should have 'Required' validation error given input field is touched without inputting anything", async () => {
        const { creditScoreInput, findByTestId } = setup()

        // Call blur without inputting anything.
        fireEvent.blur(creditScoreInput);
        const requiredValidationError = await findByTestId("errors-creditScore");
        expect(requiredValidationError.innerHTML).toBe("Required");
    });

    test("should have 'Min score value 300' given input field is touched with value lower than 300", async () => {
        const { creditScoreInput, findByTestId } = setup()

        fireEvent.change(creditScoreInput, {target: {value: 100}})
        // Call blur with a value lower than 300.
        fireEvent.blur(creditScoreInput);
        const minScoreValuevalidationError = await findByTestId("errors-creditScore");
        expect(minScoreValuevalidationError.innerHTML).toBe("Min score value 300");
    });

    test("should have 'Max score value 850' given input field is touched with value lower than 300", async () => {
        const { creditScoreInput, findByTestId } = setup()

        fireEvent.change(creditScoreInput, {target: {value: 900}})
        // Call blur with a value higher than 850.
        fireEvent.blur(creditScoreInput);
        const maxScoreValuevalidationError = await findByTestId("errors-creditScore");
        expect(maxScoreValuevalidationError.innerHTML).toBe("Max score value 850");
    });

    test("submit button renders the right content", () => {
        const { findByText, getByText } = setup();
        expect(getByText('Submit')).toBeInTheDocument();
    });

    test("submit button renders with correct disable attribute", async () => {
        const { findByText } = setup();
        expect( await findByText('Submit')).toBeDisabled();
    });


    test("submit button attribute is enable when form inputs pass validation", async () => {
        const {
            purchasePriceInput,
            autoMakeInput,
            autoModelInput,
            yearlyIncomeInput,
            creditScoreInput,
            findByText
             } = setup();

        fireEvent.change(purchasePriceInput, {target: {value: 13}})
        fireEvent.change(autoMakeInput, {target: {value: 'Mazda'}})
        fireEvent.change(autoModelInput, {target: {value: 'CX5'}})
        fireEvent.change(yearlyIncomeInput, {target: {value: 95000}})
        fireEvent.change(creditScoreInput, {target: {value: 600}})
        const button = await findByText('Submit');

        expect( button).toBeEnabled();
    });

    test("submit button attribute is disable when form inputs don't pass validation", async () => {
        const {
            purchasePriceInput,
            autoMakeInput,
            autoModelInput,
            yearlyIncomeInput,
            creditScoreInput,
            findByText
             } = setup();

        fireEvent.change(purchasePriceInput, {target: {value: 13}})
        fireEvent.change(autoMakeInput, {target: {value: 'Mazda'}})
        fireEvent.change(autoModelInput, {target: {value: 'CX5'}})
        fireEvent.change(yearlyIncomeInput, {target: {value: 95000}})
        // Validation error on this field — value must be between 300-850
        fireEvent.change(creditScoreInput, {target: {value: 100}})
        const button = await findByText('Submit');

        expect( button).toBeDisabled();
    });

    test("button text changes on click", async () => {
        const {
            purchasePriceInput,
            autoMakeInput,
            autoModelInput,
            yearlyIncomeInput,
            creditScoreInput,
            findByText
             } = setup();

        fireEvent.change(purchasePriceInput, {target: {value: 13}})
        fireEvent.change(autoMakeInput, {target: {value: 'Mazda'}})
        fireEvent.change(autoModelInput, {target: {value: 'CX5'}})
        fireEvent.change(yearlyIncomeInput, {target: {value: 95000}})
        fireEvent.change(creditScoreInput, {target: {value: 600}})

        const submitButton = await findByText('Submit');
        expect(submitButton).toBeInTheDocument();
        fireEvent.click(submitButton)
        expect(await findByText('Please wait...')).toBeInTheDocument();
    });

})

