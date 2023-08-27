import { useQuery } from "@tanstack/react-query";
import { getUsersRequest } from "../../api/users";
import { Link } from 'react-router-dom';
import { useParams, useSearchParams } from "react-router-dom";
import Pagination from "../../shared/Pagination";
import {useDocumentTitle} from '../../libs/setDocumentTitle'
function UsersList() {
    const [document_title, setDoucmentTitle] = useDocumentTitle("User List");
    const [searchParams] = useSearchParams();
    const page = (searchParams.get('page')) ? searchParams.get('page') : 1;
    const {
        data: users,
        isLoading,
        error,
    } = useQuery(["users", page], getUsersRequest, page);

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
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr className="table-primary">
                            <th>ID</th>
                            <th>Name</th>
                            <th>Customer</th>
                            <th>Email</th>
                            <th>Roles</th>
                            <th>Created At</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.data.map(({ id, name, email, created_at, customer, roles }) => {
                            return (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{name}</td>
                                    <td>{customer?.name}</td>
                                    <td>{email}</td>
                                    <td>{roles.join(', ')}</td>
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
            <Pagination links={users.meta.links} />
        </>
    );
}

export default UsersList;