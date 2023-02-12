import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import SearchBar from './SearchBar';

function Header({ questions, onSearch }) {
    const { isAuthenticated, authData } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('email');
        authData.logout();
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        onSearch(term);
    };

    return (
        <header className='header'>
            <SearchBar onSearch={handleSearch} />
            {isAuthenticated ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <>
                    <button>
                        <Link to={'/login'}>Login</Link>
                    </button>
                    <button>
                        <Link to={'/register'}>Register</Link>
                    </button>
                </>
            )}
        </header>
    );
}

export default Header;
