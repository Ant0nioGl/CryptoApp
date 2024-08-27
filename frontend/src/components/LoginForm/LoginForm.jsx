import './LoginForm.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send login request to the backend
            const response = await axios.post('http://localhost:3000/login', data);

            if (response.status === 200) {
                // Store the token in sessionStorage
                sessionStorage.setItem('token', response.data.token);

                navigate('/home');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data.msg);
            } else {
                console.error('Error during login:', error);
                setError('Login failed. Please try again.');
            }
        }
    };

    return (
        <div className='login-container'>
            <form className='login-form' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label> <br />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder='Email'
                        value={data.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label> <br />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder='Password'
                        value={data.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                {error && <div className='error-message'>{error}</div>}
            </form>
        </div>
    );
}

export default LoginForm;
