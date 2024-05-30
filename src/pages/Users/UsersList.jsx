import { useQuery } from "@tanstack/react-query";
import { getUsersRequest } from "../../api/users";
import { Link } from 'react-router-dom';
import { useParams, useSearchParams } from "react-router-dom";
import Pagination from "../../shared/Pagination";
import {useDocumentTitle} from '../../libs/setDocumentTitle'
import { FaPencilAlt, FaListUl } from "react-icons/fa";
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
            
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Customer</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Roles</th>
                            <th scope="col" className="px-6 py-3">Created At</th>
                            <th scope="col" className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.data.map(({ id, name, email, created_at, customer, roles }) => {
                            return (
                                <tr key={id}>
                                    <td className="px-6 py-4">{id}</td>
                                    <td className="px-6 py-4">{name}</td>
                                    <td className="px-6 py-4">{customer?.name}</td>
                                    <td className="px-6 py-4">{email}</td>
                                    <td className="px-6 py-4">{roles.join(', ')}</td>
                                    <td className="px-6 py-4">{created_at}</td>
                                    <td className="px-6 py-4">
                                        <Link
                                            tabIndex="-1"
                                            to={`/users/${id}/edit`}
                                            className="m-2"
                                        >
                                            <FaPencilAlt />
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