import { useQuery } from "@tanstack/react-query";
import { getCustomersRequest } from "../api/customers";
import { Link, useSearchParams } from 'react-router-dom';
import Pagination from "../shared/Pagination";

import { useDocumentTitle } from '../libs/setDocumentTitle'
import useAuth from "../hooks/useAuth";
import Dashboard from "./Customers/Dashboard";
import { FaPencilAlt, FaListUl } from "react-icons/fa";

function CustomersList() {

  const { auth } = useAuth();


  if (!auth.roles.includes('Admin')) {
    return <Dashboard />
  }

  const [searchParams] = useSearchParams();
  const page = (searchParams.get('page')) ? searchParams.get('page') : 1;
  const [document_title, setDoucmentTitle] = useDocumentTitle("Home page");
  const {
    data: customers,
    isLoading,
    error,
  } = useQuery(["customers", page], getCustomersRequest, page);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message} </div>;

  if (customers?.data?.length === 0)
    return (
      <div className="h-[calc(100vh-150px)] flex items-center justify-center">
        <div>

          <h1 className="text-center text-2xl">You don't have customers yet</h1>
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
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Balance</th>
              <th scope="col" className="px-6 py-3">Created At</th>
              <th scope="col" className="px-6 py-3">Users</th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {customers.data.map(({ id, name, email, status, balance, created_at }) => {
              return (
                <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{id}</td>
                  <td className="px-6 py-4">{name}</td>
                  <td className="px-6 py-4">{email}</td>
                  <td className="px-6 py-4">{status}</td>
                  <td className="px-6 py-4">{balance}</td>
                  <td className="px-6 py-4">{created_at}</td>
                  <td className="px-6 py-4">
                    <Link
                      tabIndex="-1"
                      to={`/customers/${id}/users`}
                      className="m-2"
                    >
                      <FaListUl />
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      tabIndex="-1"
                      to={`/customers/${id}/edit`}
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
      <Pagination links={customers.meta.links} />
    </>
  );
}

export default CustomersList;