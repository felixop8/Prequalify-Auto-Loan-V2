import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useFormik } from 'formik';
import { IRegisterUserFormValues } from '../../types';
import * as Yup from 'yup';
import { registerUser } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

const RegisterUserForm: React.FC<{}> = () => {
    const dispatch = useDispatch();
    const { loading, error, status } = useSelector((state: RootState) => state.registerUser);

    const history = useHistory();

    // Validation Schema for new account form — Formik + Yup = :) 
    const validationSchema: Yup.ObjectSchema<IRegisterUserFormValues> = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().min(8, 'At least 8 characters.')
        .matches(/[a-z]/, 'At least one lowercase char')
        .matches(/[A-Z]/, 'At least one uppercase char')
        .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'At least 1 number or special char (@,!,#, etc).')
        .required('Required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Password must match').required('Required'),
    }).defined();

    // Instead of using React 'useState' hook, Formik provides its own state management methods.
    const initialValues: IRegisterUserFormValues = {
        email: '',
        password: '',
        confirmPassword: ''
    }

    const onSubmit = (values: IRegisterUserFormValues) => {
      dispatch(registerUser(values));
      history.push("/prequalifyResult")
    }

      // Formik hook
      const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });


    // If promised resolved redirect user to result page.
    // Alternatively, you can create navigation redirects through Redux middleware:
    // https://gist.github.com/diegocasmo/06186f61766987be30d242f0b7291307#file-create_middleware-js
    // https://gist.github.com/diegocasmo/24016343f380243dd9533ed4b0588ba3#file-redirect_middleware-js
    // OR directly from the action creator:
    // https://stackoverflow.com/questions/48514773/use-history-push-in-action-creator-with-react-router-v4
    if(status === 201) return <Redirect to={"/logginUser"} />;


    // Formik returns a helper method called "getFieldProps()", this method returns
    // a group of functions — onChange, onBlur, value and checked — for a given field. I used the
    // spread operator on each field to reduce boilerplate.
    return (
        <div className="container">
        <div className="row mb-5">
          <div className="col-lg-12 text-center">
            <h1 className="mt-5">Create an account:</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <form onSubmit={formik.handleSubmit}>

              <div className="form-group">
                <label htmlFor="price">Email</label>
                <input
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                disabled={!(formik.dirty && formik.isValid) || loading}
              >
                {loading 
                  ? (
                    <>
                      <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> 
                      <span> Loading...</span>
                    </>
                    )
                  : "Register user"
                }
              </button>
            </form>
          </div>
        </div>
        {
          error &&
          <div className="alert alert-danger" role="alert">
            { error }
          </div>
        }
      </div>
    )
}

export default RegisterUserForm
