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
            <h2>Dashboard</h2>

            <div className="row">
                <div className="col-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Name</h3>
                            <p className="card-text">{customer.name}</p>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Email</h3>
                            <p className="card-text">{customer.email}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-1">
                <div className="col-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Status</h3>
                            <p className="card-text">{customer.status}</p>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Balance</h3>
                            <p className="card-text">{customer.balance}</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Dashboard;