import { getUserRequest, updateRequest } from '../../api/users';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDocumentTitle } from '../../libs/setDocumentTitle'
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { UserForm } from '../../shared/UserForm';

function UserEdit() {

    const queryClient = useQueryClient()
    const notify = (name) => {
        toast.success(`The user ${name} updated!`)
        {
            navigate('/users')
        }
    };
    const [document_title, setDoucmentTitle] = useDocumentTitle("Edit User");
    const { id } = useParams()
    const navigate = useNavigate();
    const {
        data: user,
        error, isLoading, isError
    } = useQuery(["user", id], getUserRequest, id);

    const { mutateAsync, isLoading: isMutating } = useMutation(updateRequest,
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries({ queryKey: ['user', id] })
            },
        }

    )

    const onFormSubmit = async (formData) => {
        await mutateAsync({ ...formData })
        notify(formData.name)
    }

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error: {error.message} </div>;



    return (
        <div className="flex flex-col items-center h-screen">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Update an user</h2>
                <UserForm defaultValues={user} onFormSubmit={onFormSubmit} isLoading={isMutating} />
            </div>
        </div>
    );
}
export default UserEdit;