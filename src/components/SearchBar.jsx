import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Search for a question'
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button type='submit'>Search</button>
        </form>
    );
}

export default SearchBar;
