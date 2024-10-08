import './RegistrationForm.css';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function RegistrationForm() {
    const [data, setData] = useState({
        name: '',
        surname: '',
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
            const response = await axios.post('http://localhost:3000/register', data);
            if (response.status === 201) {
                navigate('/register-success');
            } else {
                setError('Unexpected response from server.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className='register-container'>
            <form className='register-form' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label> <br />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder='Name'
                        value={data.name}
                        onChange={handleChange}
                        autoFocus
                        required
                    />
                </div>
                <div>
                    <label htmlFor="surname">Surname:</label> <br />
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        placeholder='Surname'
                        value={data.surname}
                        onChange={handleChange}
                        required
                    />
                </div>
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
                        placeholder='Strong password'
                        value={data.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Register</button>
                {error && <div className='error-message'>{error}</div>}
                <div className="login-link">
                    <span>Already have an account? </span>
                    <Link to="/login">Log in here</Link>
                </div>
            </form>
        </div>
    );
}

export default RegistrationForm;
