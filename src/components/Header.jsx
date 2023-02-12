import React, { useContext, useMemo } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Header() {
    const { isAuthenticated, authData } = useContext(AuthContext);
    const handleLogout = useMemo(() => {
        return () => {
            localStorage.removeItem('email');
            authData.logout();
        };
    }, [authData]);

    return (
        <header className='header'>
            {isAuthenticated ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <>
                    <button><Link to={'/login'}>Login</Link></button>
                    <button><Link to={'/register'}>Register</Link></button>
                </>
            )}
        </header>
    );
}

export default Header;