import { useDocumentTitle } from '../libs/setDocumentTitle'
import useAuth from "../hooks/useAuth";
import { ProfileForm } from '../shared/ProfileForm';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRequest } from '../api/users';
import { toast } from 'react-toastify';

function ProfilePage() {

    const queryClient = useQueryClient()
    const { auth } = useAuth();
    const [document_title, setDoucmentTitle] = useDocumentTitle("Profile page");

    const notify = () => {
        toast.success(`Your profle is updated!`)
    };

    const { mutateAsync, isLoading: isMutating } = useMutation(updateRequest,
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries({ queryKey: ['user', auth.id] })
            },
        }
    )

    const onFormSubmit = async (formData) => {
        await mutateAsync({ ...formData })
        notify()
    }

    return (
        <div className="flex flex-col items-center h-screen">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
                <ProfileForm defaultValues={auth} onFormSubmit={onFormSubmit} isLoading={isMutating} />
            </div>
        </div>
    );
}

export default ProfilePage;