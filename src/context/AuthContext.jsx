import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({
    isAuthenticated: false,
    userId: null,
    authData: {
        login: (email, userId) => { },
        logout: () => { }
    }
});

export function AuthContextProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null); useEffect(() => {
        const email = localStorage.getItem('email');
        const storedUserId = localStorage.getItem('userId');
        if (email && storedUserId) {
            setIsAuthenticated(true);
            setUserId(storedUserId);
        }
    }, []);

    const authData = {
        login: (email, userId) => {
            setIsAuthenticated(true);
            setUserId(userId);
            localStorage.setItem('email', email);
            localStorage.setItem('userId', userId);
        },
        logout: () => {
            setIsAuthenticated(false);
            setUserId(null);
            localStorage.removeItem('email');
            localStorage.removeItem('userId');
        },
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userId, authData }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;