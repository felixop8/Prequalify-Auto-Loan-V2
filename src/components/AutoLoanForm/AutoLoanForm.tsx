import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useFormik } from 'formik';
import { IAutoLoanFormValues } from '../../types';
import * as Yup from 'yup';
import axios from 'axios';
import { addApplicationInfo } from '../../redux';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

const AutoLoanForm: React.FC<{}> = () => {
    const dispatch = useDispatch();
    let history = useHistory();

    const validationSchema: Yup.ObjectSchema<IAutoLoanFormValues> = Yup.object({
        price: Yup.number().required('Required'),
        make: Yup.string().required('Required'),
        model: Yup.string().required('Required'),
        income: Yup.number().required('Required'),
        credit: Yup.number().min(300, 'Min score value 300').max(850, 'Max score value 850').required('Required'),
    }).defined();

    const initialValues: IAutoLoanFormValues = {
        price: '',
        make: '',
        model: '',
        income: '',
        credit: ''
    }

    const onSubmit = (values: IAutoLoanFormValues, onSubmitProps: any) => {
      axios.get("api/prequalified", { params: values })
        .then(response => {
          dispatch(addApplicationInfo(response.data.data))

          onSubmitProps.setSubmitting(false);
          onSubmitProps.resetForm();

          if(Object.is(response.data.data.prequalification_status, 1)){
            history.push("/registration");
          } else {
            history.push("/disqualification");
          }
          
         
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


    // Formik returns a helper method called "getFieldProps()", this method returns
    // a group functions — onChange, onBlur, value and checked — for a given field. I used the
    // spread operator on each field to reduce boilerplate.
    return (
        <div className="container">
        <div className="row mb-5">
          <div className="col-lg-12 text-center">
            <h1 className="mt-5">Get prequalified today</h1>
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
      </div>
    )
}

export default AutoLoanForm
