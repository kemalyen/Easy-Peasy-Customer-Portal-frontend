import { createRequest } from '../../api/users';
import { useMutation } from "@tanstack/react-query";
import {useDocumentTitle} from '../../libs/setDocumentTitle'
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
import { UserForm } from '../../shared/UserForm';

function UserCreate() {
    const [document_title, setDoucmentTitle] = useDocumentTitle("Create User");

    const notify = (name) => {
        toast.success(`The new user ${name} created!`)
        {
            navigate('/users')
        }
    };

    const navigate = useNavigate();

    let user = {
        id: '', name: '', email: '', roles: ''
    }

    const { mutateAsync, isLoading: isMutating, error } = useMutation(createRequest)

    const onFormSubmit = async (formData) => {
        await mutateAsync({ ...formData })
        notify(formData.name)
    }
 
    return (
        <div className="row">
            <div className="mx-auto col-10 col-md-8 col-lg-6">
                <h2>Create a new user</h2>
                <UserForm defaultValues={user} onFormSubmit={onFormSubmit} isLoading={isMutating} />
            </div>
        </div>
    );
}
export default UserCreate;