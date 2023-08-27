import React from 'react'
import useAuth from '../../hooks/useAuth'
import { logoutRequest } from '../../api/auth';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function LogoutPage() {

    const navigate = useNavigate();
    const { setAuth } = useAuth();
    useEffect(() => {
        logoutRequest().then(() => {
            setAuth({});
            localStorage.removeItem('user')
            navigate('/')
        })
    }, [])
  return (
    <div>Logout</div>
  )
}

export default LogoutPage