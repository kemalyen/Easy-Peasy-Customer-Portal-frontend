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
                //console.log(err)
                formik.setErrors(err.response?.data?.errors)
            })
        },
        enableReinitialze: true,
    });

    return (
        <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto">
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Name</label>
                {formik.touched.name && formik.errors.name ? (
                    <p id="filled_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400">{formik.errors.name}</p>
                ) : null}
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Email</label>
                {formik.touched.email && formik.errors.email ? (
                    <p id="filled_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400">{formik.errors.email}</p>
                ) : null}
            </div>


            <div className="relative z-0 w-full mb-5 group">
                <input type="password" name="password" autoComplete="off"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Password</label>
                {formik.touched.password && formik.errors.password ? (
                    <p id="filled_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400">{formik.errors.password}</p>
                ) : null}
            </div>

            <div className="relative z-0 w-full mb-5 group">
                <input type="password" name="password_confirmation" autoComplete="off"
                    onChange={formik.handleChange}
                    value={formik.values.password_confirmation}
                    id="emapassword_confirmationil" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="password_confirmation" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
                {formik.touched.password_confirmation && formik.errors.password_confirmation ? (
                    <p id="filled_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400">{formik.errors.password_confirmation}</p>
                ) : null}
            </div>


            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
      
        </form>
    );
};