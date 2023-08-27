import { useQuery } from "@tanstack/react-query";
import { getUsersByCustomersRequest } from "../../api/customers";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import {useDocumentTitle} from '../../libs/setDocumentTitle'

function UserListByCustomer() {

    const [document_title, setDoucmentTitle] = useDocumentTitle("Users List");
    const { id } = useParams()

    const {
        data: users,
        isLoading,
        error,
    } = useQuery(["users", id], getUsersByCustomersRequest, id);

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error: {error.message} </div>;

    if (users?.length === 0)
        return (
            <div className="h-[calc(100vh-150px)] flex items-center justify-center">
                <div>
                    <h1 className="text-center text-2xl">You don't have users yet</h1>
                </div>
            </div>
        );

    return (
        <>
            <h3>Users List</h3>

            <div className="d-flex justify-content-end">
 
            </div >
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr className="table-primary">
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created At</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(({ id, name, email, created_at, customer }) => {
                            return (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{name}</td>
                                    <td>{email}</td>
                                    <td>{created_at}</td>
                                    <td>
                                        <Link
                                            tabIndex="-1"
                                            to={`/users/${id}/edit`}
                                            className="btn btn-sm btn-primary"
                                        >
                                            <i className="bi bi-pencil-square"></i>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        }
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default UserListByCustomer;