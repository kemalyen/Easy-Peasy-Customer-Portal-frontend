import { useFormik } from 'formik';
import { Link } from "react-router-dom";

export const LoginForm = ({ defaultValues, onFormSubmit, isLoading }) => {

    const formik = useFormik({
        initialValues: {
            email: defaultValues.email,
            password: defaultValues.password
        },
        onSubmit: values => {
            onFormSubmit(values)
        },
        enableReinitialze: true,
    });

    return (
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

            <button className="btn btn-md btn-primary" type="submit">Login</button>
            <Link className='m-2' to="/password/email">Reset your password</Link>
        </form>
    );
};