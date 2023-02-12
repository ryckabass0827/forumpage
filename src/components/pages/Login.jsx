import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const { authData } = useContext(AuthContext);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/users');
            const data = await response.json();
            const user = data.find(user => user.email === form.email);
            if (!user) {
                setError('Email not found');
            } else if (user.password !== form.password) {
                setError('Incorrect password');
            } else {
                setSuccessMessage('Logged in successfully');
                localStorage.setItem('email', user.email);
                localStorage.setItem('userId', user.id);
                authData.login(user.email, user.id);
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="logPage">
                <form className="LoginForm" onSubmit={handleSubmit}>
                    <p>Enter your Email</p>
                    <input
                        className="Email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <p>Enter your password</p>
                    <input
                        className="Password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <button type="submit">Login</button>
                    {successMessage && <p>{successMessage}</p>}
                    {error && <p>{error}</p>}
                </form>
            </div>
        </>
    );
};

export default Login;
