import { createRequest } from '../../api/users';
import { useMutation } from "@tanstack/react-query";
import { useDocumentTitle } from '../../libs/setDocumentTitle'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
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
        <div className="flex flex-col items-center h-screen">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Create an user</h2>
                <UserForm defaultValues={user} onFormSubmit={onFormSubmit} isLoading={isMutating} />
            </div>
        </div>
    );
}
export default UserCreate;