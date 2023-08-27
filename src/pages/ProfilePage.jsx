import { useDocumentTitle } from '../libs/setDocumentTitle'
import useAuth from "../hooks/useAuth";
import { ProfileForm } from '../shared/ProfileForm';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {  updateRequest } from '../api/users';
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
        <div className="row">
            <div className="mx-auto col-10 col-md-8 col-lg-6">
                <h2>Update Profile</h2>
                <ProfileForm defaultValues={auth} onFormSubmit={onFormSubmit} isLoading={isMutating} />
            </div>
        </div>
    );
}

export default ProfilePage;