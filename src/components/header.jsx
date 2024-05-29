import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import useAuth from "../hooks/useAuth";
const Header = () => {
    const { auth } = useAuth();
    return (
        <>
            <header> 
                <nav className="bg-white border-gray-200 dark:bg-gray-900">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                             
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Customer Portal</span>
                        </a>
                        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                 <path style={{fill: 'none', stroke: '#000000', strokeWidth: 1, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 4, strokeOpacity: 1, strokeDasharray: 'none'}} />
                            </svg>
                        </button>
                        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                {auth?.roles &&
                                    <li className="nav-item">
                                        <Link to='/' className="p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">
                                            <span className='mx-2'>Dashboard</span>
                                        </Link>
                                    </li>
                                }
                                {auth?.roles?.includes('Admin') &&
                                    <li className="nav-item">
                                        <Link to='/' className="p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">
                                            <span className='mx-2'>Customers</span>
                                        </Link>
                                    </li>
                                }
                                {auth?.roles?.includes('Admin') &&
                                    <li className="nav-item">
                                        <Link to='/customers/create' className="p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">
                                            <span className='mx-2'>Create Customer</span>
                                        </Link>
                                    </li>
                                }
                                {auth?.roles?.includes('Manager') &&
                                    <li className="nav-item">
                                        <Link to='/users/create' className="p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">
                                            <span className='mx-2'>Create User</span>
                                        </Link>
                                    </li>
                                }
                                {auth?.roles?.includes('Manager') &&
                                    <li>
                                        <Link to='/users' className="p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">
                                            <span className='mx-2'>Users</span>
                                        </Link>
                                    </li>
                                }
                                {(auth?.roles?.includes('Manager') || auth?.roles?.includes('User') || auth?.roles?.includes('Admin')) &&
                                    <li>
                                        <Link to='/profile' className="p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">
                                            <span className='mx-2'>Profile</span>
                                        </Link>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 bg-blue-400">
                    <div className="container d-flex flex-wrap justify-content-end">
                        <div className="text-end">
                            {!auth.name &&
                                <div>
                                    <Link to='/login' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</Link>
                                </div>
                            }
                            {auth?.name &&
                                <div>
                                    <Link to='/logout' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log Out</Link>
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