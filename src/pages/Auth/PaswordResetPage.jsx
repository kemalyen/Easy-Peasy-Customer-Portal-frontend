import React, { useEffect } from 'react'
import { Link, useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from "../../api/users";
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

function PaswordResetPage() {

    const [searchParams] = useSearchParams();
    const email = (searchParams.get('email')) ? searchParams.get('email') : '';
    const { token } = useParams()
    const navigate = useNavigate();

    const notify = (name) => {
        toast.success(`Your password is updated!`)
        {
            navigate('/login')
        }
    };
    const faild = (error) => {
        toast.error(`${error}`)
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
                notify(data)
            }).catch((e) => {
                faild(e.response.data.message);
            })
             
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

                    <div className="mb-3">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            className="form-control"
                            id="password"
                            name="password"
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>
                        ) : null}
                    </div>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            className="form-control"
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.password_confirmation}
                        />
                        {formik.touched.password_confirmation && formik.errors.password_confirmation ? (
                            <div>{formik.errors.password_confirmation}</div>
                        ) : null}
                    </div>

                    <button className="btn btn-md btn-primary" type="submit">Update Password</button>
                </form>
            </div>
        </div>
    );
}

export default PaswordResetPage