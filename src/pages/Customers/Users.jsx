import { useQuery } from "@tanstack/react-query";
import { getUsersByCustomersRequest } from "../../api/customers";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useDocumentTitle } from '../../libs/setDocumentTitle'
import { FaPencilAlt, FaListUl } from "react-icons/fa";
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
            <h3 className="text-2xl font-bold mb-4">Users List</h3>

            <div className="d-flex justify-content-end">

            </div >
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Created At</th>
                            <th scope="col" className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(({ id, name, email, created_at, customer }) => {
                            return (
                                <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-4">{id}</td>
                                    <td className="px-6 py-4">{name}</td>
                                    <td className="px-6 py-4">{email}</td>
                                    <td className="px-6 py-4">{created_at}</td>
                                    <td className="px-6 py-4">
                                        <Link
                                            tabIndex="-1"
                                            to={`/users/${id}/edit`}
                                        >
                                            <FaPencilAlt/>
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