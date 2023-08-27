import { useFormik } from 'formik';

export const ProfileForm = ({ defaultValues, onFormSubmit, isLoading }) => {

    const formik = useFormik({
        initialValues: {
            id: defaultValues.id,
            name: defaultValues.name,
            email: defaultValues.email,
            password: '',
            password_confirmation: ''
        },
        onSubmit: values => {
            onFormSubmit(values).catch((err) => {
                console.log(err)
                formik.setErrors(err.response?.data?.errors)
            })
        },
        enableReinitialze: true,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
                <label className="form-label" htmlFor="name">Name</label>
                <input
                    className="form-control"
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                    <div className="is-invalid text-danger">{formik.errors.name}</div>
                ) : null}
            </div>
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
                    <div className="is-invalid text-danger">{formik.errors.email}</div>
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
            <button className="btn btn-md btn-primary" type="submit">Update</button>
        </form>
    );
};