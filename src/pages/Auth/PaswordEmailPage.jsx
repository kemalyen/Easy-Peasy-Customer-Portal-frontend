import React, { useEffect } from 'react'
import { Link, useSearchParams, useParams } from 'react-router-dom';
import { sendResetLinkEmail } from "../../api/users";
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

function PaswordEmailPage() {
 
    const notify = (name) => {
        toast.success(`If an account matches the information you entered, then you will receive an email!`)
    };

    const faild = (error) => {
        toast.error(`${error.message}`) 
    };
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: values => {
            sendResetLinkEmail(values).then((data) => {
                notify()
            }).catch((e) => {
                faild(e.message);
            })
            console.log(values)
        },
        enableReinitialze: true,
    });

    return (
        <div className="row">
            <div className="mx-auto col-10 col-md-8 col-lg-6">
                <form onSubmit={formik.handleSubmit}>
                    <input
                        id="token"
                        name="token"
                        type="hidden"
                        value={formik.values.token}
                    />
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

                    <button className="btn btn-md btn-primary" type="submit">Send Reset Link</button>
                </form>
            </div>
        </div>
    );
}

export default PaswordEmailPage