import { getCustomerRequest } from '../../api/customers';
import { useQuery } from "@tanstack/react-query";
import { useDocumentTitle } from '../../libs/setDocumentTitle'
import useAuth from "../../hooks/useAuth";
function Dashboard() {
    const [document_title, setDoucmentTitle] = useDocumentTitle("Customer Dashboard");
    const { auth } = useAuth();
    const {
        data: customer,
        error, isLoading, isError
    } = useQuery(["customer", auth.customer?.id], getCustomerRequest, auth.customer?.id);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message} </div>;
    return (
        <>
            <div className="container mx-auto px-4">
                
                <div className="grid grid-rows-2 grid-flow-col gap-1">
                    <div className='text-md font-bold text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 p-3'>Name</div>
                    <div  className='text-xs text-gray-700 uppercase bg-gray-550 dark:bg-gray-700 dark:text-gray-400 p-3'>{customer.name}</div>
                    <div className='text-md font-bold text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 p-3'>Email</div>
                    <div  className='text-xs text-gray-700 uppercase bg-gray-550 dark:bg-gray-700 dark:text-gray-400 p-3'>{customer.email}</div>
                    <div className='text-md font-bold text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 p-3'>Status</div>
                    <div  className='text-xs text-gray-700 uppercase bg-gray-550 dark:bg-gray-700 dark:text-gray-400 p-3'>{customer.status}</div>
                    <div className='text-md font-bold text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 p-3'>Balance</div>
                    <div  className='text-xs text-gray-700 uppercase bg-gray-550 dark:bg-gray-700 dark:text-gray-400 p-3'>{customer.balance}</div>
                </div>
            </div>
        </>
    );
}
export default Dashboard;