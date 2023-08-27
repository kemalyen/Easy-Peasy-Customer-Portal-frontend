import { getCustomerRequest, updateRequest } from '../../api/customers';
import { useQuery, useMutation } from "@tanstack/react-query";
import {useDocumentTitle} from '../../libs/setDocumentTitle'
import { useNavigate, useParams } from "react-router-dom";
import {  toast } from 'react-toastify';
import { CustomerForm } from '../../shared/CustomerForm';
import 'react-toastify/dist/ReactToastify.css';

function CustomerEdit() {
    const notify = (name) => {
        toast.success(`The customer ${name} updated!`)
        {
            navigate('/')
        }
    };
    const [document_title, setDoucmentTitle] = useDocumentTitle("Update Customer");
    const { id } = useParams()
    const navigate = useNavigate();
    const {
        data: customer,
        error, isLoading, isError
    } = useQuery(["customer", id], getCustomerRequest, id);

    const { mutateAsync, isLoading: isMutating } = useMutation(updateRequest)

    const onFormSubmit = async (formData) => {
        await mutateAsync({ ...formData })
        notify(formData.name)
    }


    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error: {error.message} </div>;



    return (
        <div className="row">
            <div className="mx-auto col-10 col-md-8 col-lg-6">
                <h2>Update the customer</h2>

                <CustomerForm defaultValues={customer} onFormSubmit={onFormSubmit} isLoading={isMutating} />
            </div>
        </div>
    );
}
export default CustomerEdit;