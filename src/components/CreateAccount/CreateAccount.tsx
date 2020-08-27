import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useFormik } from 'formik';
import { ICreateAccountValues } from '../../types';
import { RootState } from '../../redux/rootReducer';
import * as Yup from 'yup';
import axios from 'axios';
import { loggedIn } from '../../redux';
import { useSelector, useDispatch } from 'react-redux';

const CreateAccount: React.FC<{}> = () => {
    const dispatch = useDispatch();

    // Gets the prequalify result message from Redux store - reducer 'prequalify'.
    const selectPrequalifyResultMessage = (state: RootState) => state.prequalify.prequalify_result_message;
    const prequalifyResultMessage = useSelector(selectPrequalifyResultMessage);

    // Validation Schema for new account form — Formik + Yup = :) 
    const validationSchema: Yup.ObjectSchema<ICreateAccountValues> = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().min(8, 'At least 8 characters.')
        .matches(/[a-z]/, 'At least one lowercase char')
        .matches(/[A-Z]/, 'At least one uppercase char')
        .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'At least 1 number or special char (@,!,#, etc).')
        .required('Required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Password must match').required('Required'),
    }).defined();

    // Instead of using React 'useState' hook, Formik provides its own state management methods.
    const initialValues: ICreateAccountValues = {
        email: '',
        password: '',
        confirmPassword: ''
    }

    const onSubmit = (values: ICreateAccountValues, onSubmitProps: any) => {
      // Axios post request to create a new account.
      axios.post("api/create/accounts", values)
        .then(response => {
          // On successful new account set user as logged in.
          dispatch(loggedIn(response.data.data))
          
          //Reset form
          onSubmitProps.setSubmitting(false);
          onSubmitProps.resetForm();
        }).catch(err => {
           // I am just console.log the error here, but of course it would be nice
          // to have log monitoring & Analysis app, and maybe PagerDuty :((
          console.log({err});
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
            <h1 className="mt-5">{ prequalifyResultMessage }</h1>
            <h1 className="mt-5">Next step is to create an account:</h1>

          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <form onSubmit={formik.handleSubmit}>

              <div className="form-group">
                <label htmlFor="price">Email</label>
                <input
                  type="text"
                  id="email"
                  className={`form-control ${
                    formik.touched.email && formik.errors.email ? "is-invalid" : ""
                  }`}
                  
                  { ...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? <div className="invalid-feedback">{formik.errors.email}</div> : null}
              </div>

              <div className="form-group">
                <label htmlFor="make">Password</label>
                <input
                  type="password"
                  id="password"
                  className={`form-control ${
                    formik.touched.password && formik.errors.password ? "is-invalid" : ""
                  }`}
                  { ...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? <div className="invalid-feedback">{formik.errors.password}</div> : null}
              </div>

              <div className="form-group">
                <label htmlFor="make">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  className={`form-control ${
                    formik.touched.confirmPassword && formik.errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  { ...formik.getFieldProps('confirmPassword')}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div className="invalid-feedback">{formik.errors.confirmPassword}</div> : null}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}
              >
                  {formik.isSubmitting ? "Please wait..." : "Create account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
}

export default CreateAccount
