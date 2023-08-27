import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    let user = (localStorage.getItem("user") || false);
    try {
        user = JSON.parse(localStorage.getItem("user"));
    } catch (error) {
        user = false
    }
    !auth?.email && user && setAuth(user)

    return (
        <AuthContext.Provider value={{ auth, setAuth, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;