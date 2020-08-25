import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useFormik } from 'formik';
import { IRegistrationFormValues } from '../../types';
import * as Yup from 'yup';
import axios from 'axios';

const RegistrationForm: React.FC<{}> = () => {

    const validationSchema: Yup.ObjectSchema<IRegistrationFormValues> = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().min(8, 'At least 8 characters.')
        .matches(/[a-z]/, 'At least one lowercase char')
        .matches(/[A-Z]/, 'At least one uppercase char')
        .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'At least 1 number or special char (@,!,#, etc).')
        .required('Required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Password must match').required('Required'),
    }).defined();

    const initialValues: IRegistrationFormValues = {
        email: '',
        password: '',
        confirmPassword: ''
    }

    const onSubmit = (values: IRegistrationFormValues, onSubmitProps: any) => {
      axios.post<IRegistrationFormValues>("api/user", values)
        .then(response => {
          console.log({response});
          onSubmitProps.setSubmitting(false);
          onSubmitProps.resetForm();
        }).catch(err => {
          console.log({err});
        })
    }

      // Formik hook
      const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });


    return (
        <div className="container">
        <div className="row mb-5">
          <div className="col-lg-12 text-center">
            <h1 className="mt-5">Sign Up</h1>
            <p>Lorem ipsum dolor sit amet! Neque poro quisquam est qui do dolor amet, adipisci velit...</p>
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
                  {formik.isSubmitting ? "Please wait..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
}

export default RegistrationForm
