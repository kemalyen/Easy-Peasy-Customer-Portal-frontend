import { createRequest } from '../../api/customers';
import { useMutation } from "@tanstack/react-query";
import { useDocumentTitle } from '../../libs/setDocumentTitle'
import { useNavigate } from "react-router-dom";

import { CustomerForm } from '../../shared/CustomerForm';

function CustomerCreate() {
    const [document_title, setDoucmentTitle] = useDocumentTitle("Create Customer");

    const notify = (name) => {
        toast.success(`The new user ${name} created!`)
        {
            navigate('/users')
        }
    };
 
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
        notify(formData.name)
    } 
    return (
        <div className="flex flex-col items-center h-screen">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Create a customer</h2>
                <CustomerForm defaultValues={customer} onFormSubmit={onFormSubmit} isLoading={isMutating} />
            </div>
        </div>
    );
}
export default CustomerCreate;