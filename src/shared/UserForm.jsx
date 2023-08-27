import { useFormik } from 'formik';

export const UserForm = ({ defaultValues, onFormSubmit, isLoading }) => {

    const formik = useFormik({
        initialValues: {
            id: defaultValues.id,
            name: defaultValues.name,
            email: defaultValues.email,
            roles: defaultValues.roles
        },
        onSubmit: values => {
            onFormSubmit(values).catch((err) => {
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
                <label className="form-label" htmlFor="roles">Role</label>

                <select multiple className="form-select form-select-md" name="roles" id="roles"
                    onChange={formik.handleChange}
                    value={formik.values.roles || []}
                >
                    <option value=''>Select one</option>
                    <option value="Manager">Manager</option>
                    <option value="User">User</option>
                </select>
   
                {formik.touched.roles && formik.errors.roles ? (
                    <div className="is-invalid text-danger">{formik.errors.roles}</div>
                ) : null}
            </div>

 
            <button className="btn btn-md btn-primary" type="submit">Submit</button>
        </form>
    );
};