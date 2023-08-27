import { loginRequest, getUser } from '../../api/auth';
import { useMutation } from "@tanstack/react-query";
import { useDocumentTitle } from '../../libs/setDocumentTitle'
import { useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth'
import { LoginForm } from '../../shared/LoginForm';
import { toast } from 'react-toastify';

function LoginPage() {
    const { setAuth, user } = useAuth();
    const notify = (name) => {
        toast.success(`Welcome ${name}!`)
        {
            navigate('/users')
        }
    };
    const faild = () => {
        toast.error(`Login failed, please check your credentials!`)
        {
            navigate('/users')
        }
    };
    const [document_title, setDoucmentTitle] = useDocumentTitle("Login");
    const navigate = useNavigate();
    let loginAttemptCredentials = {
        email: '', password: ''
    }
    const { mutateAsync, isLoading: isMutating, error } = useMutation(loginRequest,
        {
            onSuccess: async (data) => { 

                if (data.status == 204) {
                    getUser().then((res) => {
                        
                        setAuth(res.data)
                        localStorage.setItem("user", JSON.stringify(res.data));
                        notify(res.data.name)
                        navigate('/')
                    }).catch(function (error) {
                        console.error(error);
                        faild();
                    });
                }else{
                    faild();
                }
            },
        }
    )

    const onFormSubmit = async (formData) => {
        await mutateAsync({ ...formData })
    }

    if (error) return <div>Error: {error.message} </div>;

    return (
        <div className="row">
            <div className="mx-auto col-10 col-md-8 col-lg-6">
                <h2>Login</h2>
                <LoginForm defaultValues={loginAttemptCredentials} onFormSubmit={onFormSubmit} isLoading={isMutating} />
            </div>
        </div>
    );
}
export default LoginPage;