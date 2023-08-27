import { createRequest } from '../../api/customers';
import { useMutation } from "@tanstack/react-query";
import { useDocumentTitle } from '../../libs/setDocumentTitle'
import { useNavigate } from "react-router-dom";

import { CustomerForm } from '../../shared/CustomerForm';

function CustomerCreate() {
    const [document_title, setDoucmentTitle] = useDocumentTitle("Create Customer");
    const navigate = useNavigate();
    let customer = {
        id: '', name: '', email: '', roles: []
    }
    const { mutateAsync, isLoading: isMutating, error, status } = useMutation(createRequest,
        {
            onSuccess: async(data, context) => {
            
            },
            onError: async(error, variables, context) => {
            
            },
        }
    )
 
    const onFormSubmit = async (formData) => {
        await mutateAsync({ ...formData })
    } 
    return (
        <div className="row">
            <div className="mx-auto col-10 col-md-8 col-lg-6">
                <h2>Create a customer</h2>
                <CustomerForm defaultValues={customer} onFormSubmit={onFormSubmit} isLoading={isMutating} />
            </div>
        </div>
    );
}
export default CustomerCreate;