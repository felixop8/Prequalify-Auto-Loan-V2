import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useFormik } from 'formik';
import { IPrequalifyFormValues } from '../../types';
import * as yup from 'yup';
import { fetchPrequalify } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { Redirect } from "react-router-dom";

const PrequalifyForm: React.FC<{}> = () => {

    const dispatch = useDispatch();
    const { loading, error, status } = useSelector((state: RootState) => state.prequalify);


    // Validation Schema for prequalify form — Formik + Yup = :) 
    const validationSchema: yup.ObjectSchema<IPrequalifyFormValues> = yup.object({
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
    const initialValues: IPrequalifyFormValues = {
        price: '',
        make: '',
        model: '',
        income: '',
        credit: ''
    }
    
    const onSubmit = (values: IPrequalifyFormValues) => {
      dispatch(fetchPrequalify(values));
    };
    

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
    if(status) return <Redirect to={"/prequalifyResult"} />;

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
                <label htmlFor="price">Auto Purchase Price</label>
                <input
                  disabled={loading}
                  type="number"
                  id="price"
                  className={`form-control ${
                    formik.touched.price && formik.errors.price ? "is-invalid" : ""
                  }`}
                  
                  { ...formik.getFieldProps('price')}
                />
                {formik.touched.price && formik.errors.price ? 
                  <div className="invalid-feedback">{formik.errors.price}</div> : 
                  null}
              </div>

              <div className="form-group">
                <label htmlFor="make">Auto Make</label>
                <input
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
                  type="number"
                  id="credit"
                  placeholder="(min 300 - max 850)"
                  className={`form-control ${
                    formik.touched.credit && formik.errors.credit ? "is-invalid" : ""
                  }`}
                  { ...formik.getFieldProps('credit')}
                />
                 {formik.touched.credit && formik.errors.credit ? 
                 <div data-testid={'errors-creditScore'} className="invalid-feedback">{formik.errors.credit}</div> :
                  null}
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
                  : "Submit"
                }
              </button>
            </form>
          </div>
        </div>
        <br/>
        {
          error &&
            <div className="alert alert-danger" role="alert">
              { error }
            </div>
        }
        
      </div>
    )
}

export default PrequalifyForm
