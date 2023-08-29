
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
const Header = () => {
    const { auth } = useAuth();

    return (
        <>
            <header>

                <nav className="navbar navbar-expand-lg navbar-light bg-info p-3">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Customer Portal</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className=" collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav ms-auto ">
                                {auth?.roles &&
                                    <li className="nav-item">
                                        <Link to='/' className="nav-link mx-2">
                                            <i className="bi bi-speedometer2"></i>
                                            <span className='mx-2'>Dashboard</span>
                                        </Link>
                                    </li>
                                }
                                {auth?.roles?.includes('Admin') &&
                                    <li className="nav-item">
                                        <Link to='/' className="nav-link mx-2">
                                            <i className="bi bi-ui-radios"></i>
                                            <span className='mx-2'>Customers</span>
                                        </Link>
                                    </li>
                                }
                                {auth?.roles?.includes('Admin') &&
                                    <li className="nav-item">
                                        <Link to='/customers/create' className="nav-link mx-2">
                                            <i className="bi bi-database-add"></i>
                                            <span className='mx-2'>Create Customer</span>
                                        </Link>
                                    </li>
                                }
                                {auth?.roles?.includes('Manager') &&
                                    <li className="nav-item">
                                        <Link to='/users/create' className="nav-link mx-2">
                                            <i className="bi bi-database-add"></i>
                                            <span className='mx-2'>Create User</span>
                                        </Link>
                                    </li>
                                }
                                {auth?.roles?.includes('Manager') &&
                                    <li>
                                        <Link to='/users' className="nav-link mx-2">
                                            <i className="bi bi-people"></i>
                                            <span className='mx-2'>Users</span>
                                        </Link>
                                    </li>
                                }
                                {(auth?.roles?.includes('Manager') || auth?.roles?.includes('User') || auth?.roles?.includes('Admin')) &&
                                    <li>
                                        <Link to='/profile' className="nav-link mx-2">
                                            <i className="bi bi-person-square"></i>
                                            <span className='mx-2'>Profile</span>
                                        </Link>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="px-3 py-2 text-bg-primary border-bottom">
                    <div className="container d-flex flex-wrap justify-content-end">
                        <div className="text-end">
                            {!auth.name &&
                                <div>
                                    <Link to='/login' className="btn btn-light text-dark me-2">Login</Link>
                                </div>
                            }

                            {auth?.name &&
                                <div>
                                    <Link to='/logout' className="btn btn-sm btn-light text-dark me-2">Log Out</Link>

                                </div>
                            }
                        </div>
                    </div>
                </div>
            </header>




        </>
    );
};

export default Header;