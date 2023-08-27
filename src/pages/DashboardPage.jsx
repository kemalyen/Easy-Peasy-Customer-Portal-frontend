import { useQuery } from "@tanstack/react-query";
import { getCustomersRequest } from "../api/customers";
import { Link, useSearchParams } from 'react-router-dom';
import Pagination from "../shared/Pagination";

import {useDocumentTitle} from '../libs/setDocumentTitle'
import useAuth from "../hooks/useAuth";
import Dashboard from "./Customers/Dashboard";

function CustomersList() {

  const { auth } = useAuth();


  if (!auth.roles.includes('Admin')){
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
      <h3>Customer List</h3>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="table-primary">
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Balance</th>
              <th>Created At</th>
              <th>Users</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {customers.data.map(({ id, name, email, status, balance, created_at }) => {
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{status}</td>
                  <td>{balance}</td>
                  <td>{created_at}</td>
                  <td>
                    <Link
                      tabIndex="-1"
                      to={`/customers/${id}/users`}
                      className="btn btn-sm btn-link"
                    >
                      User List
                    </Link>
                  </td>                  
                  <td>
                    <Link
                      tabIndex="-1"
                      to={`/customers/${id}/edit`}
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
      <Pagination links={customers.meta.links} />
    </>
  );
}

export default CustomersList;