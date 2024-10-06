import React, { useState } from 'react';

const ChangeCredentials = () => {
    const [currentEmail, setCurrentEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!currentEmail || !currentPassword || !newEmail || !newPassword || !confirmPassword) {
            setMessage('All fields are required.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage('New password and confirmation do not match.');
            return;
        }

        // Simulate updating credentials
        // In a real application, you would make an API call here
        console.log('Updating credentials:', { currentEmail, currentPassword, newEmail, newPassword });
        
        setMessage('Credentials updated successfully!');
        
        // Clear form
        setCurrentEmail('');
        setCurrentPassword('');
        setNewEmail('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="change-credentials">
            <h2>Change Email/Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="currentEmail" className="form-label">Current Email</label>
                    <input
                        type="email"
                        id="currentEmail"
                        className="form-control"
                        value={currentEmail}
                        onChange={(e) => setCurrentEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="currentPassword" className="form-label">Current Password</label>
                    <input
                        type="password"
                        id="currentPassword"
                        className="form-control"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="newEmail" className="form-label">New Email</label>
                    <input
                        type="email"
                        id="newEmail"
                        className="form-control"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        className="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {message && <div className="alert alert-info">{message}</div>}
                <button type="submit" className="btn btn-primary">Update Credentials</button>
            </form>
        </div>
    );
};

export default ChangeCredentials;
