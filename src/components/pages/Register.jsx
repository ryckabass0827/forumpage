import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Register = () => {
    const [form, setForm] = useState({ email: '', password: '', username: '', password2: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { authData } = useContext(AuthContext);

    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (form.password !== form.password2) {
                setError('Passwords do not match');
            } else {
                const response = await fetch('http://localhost:4000/users');
                let data = await response.json();
                const emailExists = data.find(user => user.email === form.email);
                if (emailExists) {
                    setError('Email already exists');
                } else {
                    await fetch('http://localhost:4000/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email: form.email, password: form.password, username: form.username, id: data.length + 1 })
                    });
                    setSuccessMessage('Registered successfully');

                    localStorage.setItem('email', form.email);
                    localStorage.setItem('userId', data.length + 1);
                    authData.login(form.email, data.length + 1);
                    navigate('/')

                }

            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <div className='regPage'>
                <form className='RegisterForm' onSubmit={handleSubmit}>
                    <p>Enter your Email</p>
                    <input className='R_email'
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <p>Enter your username</p>
                    <input className='R_username'
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <p>Enter your password</p>
                    <input className='R_password'
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <p>Please repeat password</p>
                    <input className='R_password2'
                        type="password"
                        name="password2"
                        placeholder="Confirm Password"
                        value={form.password2}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <button type="submit">Register</button>
                    {successMessage && <p>{successMessage}</p>}
                    {error && <p>{error}</p>}

                </form>
            </div>
        </>
    );
};

export default Register; 
