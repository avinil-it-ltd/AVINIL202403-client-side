import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../core/Footer';
import TopMenu from '../core/TopMenu';
import backgroundImage from '../../src/assets/images/loginbackground/loginbackground.jpg';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State to store error message
    const navigate = useNavigate();

    // Admin credentials for simple authentication
    const adminEmail = 'admin@example.com';
    const adminPassword = 'admin123';

    const handleLogin = (e) => {
        e.preventDefault();

        // Basic authentication check
        if (email === adminEmail && password === adminPassword) {
            localStorage.setItem('isLoggedIn', true); // Set login state in localStorage
            navigate('/dashboard'); // Redirect to the dashboard
        } else {
            setErrorMessage('Invalid email or password.'); // Set the error message
        }
    };

    return (
        <div>
            <div
                className="login-container"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginTop: '50px',
                    paddingRight: '50px',
                    paddingLeft: '50px',
                    boxSizing: 'border-box',
                }}
            >
                <div><TopMenu /></div>
                <div
                    className="login-form shadow-lg"
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        padding: '30px',
                        borderRadius: '8px',
                        maxWidth: '400px',
                        width: '100%',
                    }}
                >
                    <h2 className="mb-4 h1">Admin Login</h2>
                    <form onSubmit={handleLogin}>
                        {errorMessage && ( // Conditionally render the error message
                            <div className="alert alert-danger" role="alert">
                                {errorMessage}
                            </div>
                        )}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder='Email'
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder='Password'
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>
                </div>
            </div>
            <div id="contact"><Footer /></div>
        </div>
    );
};

export default Login;
