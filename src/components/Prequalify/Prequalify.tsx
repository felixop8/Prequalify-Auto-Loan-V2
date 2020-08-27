import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useFormik } from 'formik';
import { IPrequalifyValues } from '../../types';
import * as yup from 'yup';
import axios from 'axios';
import { setPreQualificationStatus } from '../../redux';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

const Prequalify: React.FC<{}> = () => {
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    let history = useHistory();

    // Validation Schema for prequalify form — Formik + Yup = :) 
    const validationSchema: yup.ObjectSchema<IPrequalifyValues> = yup.object({
        price: yup.number().required('Required'),
        make: yup.string().required('Required'),
        model: yup.string().required('Required'),
        income: yup.number().required('Required'),
        credit: yup.number().min(300, 'Min score value 300').max(850, 'Max score value 850').required('Required'),
    }).defined();

    // Instead of using React 'useState' hook, Formik provides its own state management methods.
    // Since inputs of the type 'number' are initialized as an empty string,
    // the initial values for price, income and credit can be of the type 'number'
    // or empty string ''.
    const initialValues: IPrequalifyValues = {
        price: '',
        make: '',
        model: '',
        income: '',
        credit: ''
    }

    const onSubmit = (values: IPrequalifyValues, onSubmitProps: any) => {
      // Axios fetch call to check if customer qualify for a loan.
      axios.get("api/prequalify", { params: values })
        .then(response => {
          // Dispatch action to set the prequalification result in Redux,
          // that way we can access this data later on.
          dispatch(setPreQualificationStatus(response.data.data))

          // Reset form.
          onSubmitProps.setSubmitting(false);
          onSubmitProps.resetForm();

          // Depending on the qualification flag redirect customer to 
          // the disqualified page or to the create user account page.
          //
          // Another way I think this can be done is redirecting customer to
          // a template page, and handle the disqualified condition there
          // to display the form or the disqualified message.
          if(Object.is(response.data.data.prequalify_status, 1)){
            history.push("/account");
          } else {
            history.push("/disqualified");
          }
        }).catch(err => {
          // I am just console.log the error here, but of course it would be nice
          // to have log monitoring & Analysis app, and maybe PagerDuty :((
          console.log({err});
          // Reset form.
          onSubmitProps.setSubmitting(false);
          onSubmitProps.resetForm();
          // Display the actual error that comes from the server?
          // Or just have an error flag to display a generic error message?
          //
          // I am showing the error from the backend in this example using a bootstrap alert
          // on this page, but normally I like to create a custom hook using 'toastr' 
          // https://www.npmjs.com/package/toastr that can be used in any page.
          setErrors(err.response.data.errors);
        })
    }
    

    // Formik hook
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });


    // Formik returns a helper method called "getFieldProps()", this method returns
    // a group of functions — onChange, onBlur, value and checked — for a given field. I used the
    // spread operator on each field to reduce boilerplate.
    return (
        <div className="container">
        <div className="row mb-5">
          <div className="col-lg-12 text-center">
            <h1 className="mt-5">Get Pre-Qualified Today</h1>
            <p>Discover how much you can borrow, based on your income and credit.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <form onSubmit={formik.handleSubmit}>

              <div className="form-group">
                <label htmlFor="price" >Auto Purchase Price</label>
                <input
                  type="number"
                  id="price"
                  className={`form-control ${
                    formik.touched.price && formik.errors.price ? "is-invalid" : ""
                  }`}
                  
                  { ...formik.getFieldProps('price')}
                />
                {formik.touched.price && formik.errors.price ? <div className="invalid-feedback">{formik.errors.price}</div> : null}
              </div>

              <div className="form-group">
                <label htmlFor="make">Auto Make</label>
                <input
                  type="text"
                  id="make"
                  className={`form-control ${
                    formik.touched.make && formik.errors.make ? "is-invalid" : ""
                  }`}
                  { ...formik.getFieldProps('make')}
                />
                {formik.touched.make && formik.errors.make ? <div className="invalid-feedback">{formik.errors.make}</div> : null}
              </div>

              <div className="form-group">
                <label htmlFor="model">Auto Model</label>
                <input
                  type="text"
                  id="model"
                  className={`form-control ${
                    formik.touched.model && formik.touched.model && formik.errors.model ? "is-invalid" : ""
                  }`}
                  { ...formik.getFieldProps('model')}
                />
                {formik.touched.model && formik.touched.model && formik.errors.model ? <div className="invalid-feedback">{formik.errors.model}</div> : null}
              </div>

              <div className="form-group">
                <label htmlFor="income">Stimated Yearly Income</label>
                <input
                  type="number"
                  id="income"
                  className={`form-control ${
                    formik.touched.income && formik.errors.income ? "is-invalid" : ""
                  }`}
                  { ...formik.getFieldProps('income')}
                />
                {formik.touched.income && formik.errors.income ? <div className="invalid-feedback">{formik.errors.income}</div> : null}
              </div>

              <div className="form-group">
                <label htmlFor="credit">Estimated Credit Score</label>
                <input
                  type="number"
                  id="credit"
                  className={`form-control ${
                    formik.touched.credit && formik.errors.credit ? "is-invalid" : ""
                  }`}
                  { ...formik.getFieldProps('credit')}
                />
                <small>(min 300 - max 850)</small>
                 {formik.touched.credit && formik.errors.credit ? <div className="invalid-feedback">{formik.errors.credit}</div> : null}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}
              >
                  {formik.isSubmitting ? "Please wait..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
        <br/>
        {
          errors.length > 0 &&
            <div className="alert alert-danger" role="alert">
              <ul>
                {errors.map((err) => <li>{err}</li>)}
              </ul>
            </div>
        }
        
      </div>
    )
}

export default Prequalify
