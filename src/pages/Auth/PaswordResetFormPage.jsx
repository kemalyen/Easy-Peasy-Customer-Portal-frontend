import React, { useEffect } from 'react'
import { Link, useSearchParams, useParams } from 'react-router-dom';
import { resetPassword } from "../../api/users";
import { useFormik } from 'formik';

function PaswordResetFormPage() {

    const [searchParams] = useSearchParams();
    const email = (searchParams.get('email')) ? searchParams.get('email') : '';
    const { token } = useParams()
 
    const notify = (name) => {
        toast.success(`Welcome ${name}!`) 
    };
    const faild = (error) => {
        toast.error(`${error.message}`) 
    };


    const formik = useFormik({
        initialValues: {
            email: email,
            token: token,
            password: '',
            password_confirmation: ''
        },
        onSubmit: values => {
            resetPassword(values).then((data) => {
                notify(res.data.name)
            }).catch((error) => {
                faild(error);
            })
             
        },
        enableReinitialze: true,
    });

    return (
        <div className="row">
            <div className="mx-auto col-10 col-md-8 col-lg-6">
                <form onSubmit={formik.handleSubmit}>
         
                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <input
                            className="form-control"
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}
                    </div>
 

                    <button className="btn btn-md btn-primary" type="submit">Reset Password</button>
                </form>
            </div>
        </div>
    );
}

export default PaswordResetFormPage
 