import React, { useEffect, useState } from 'react';
import axios from 'axios';


const ContactDashboard = () => {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showShortlistedOnly, setShowShortlistedOnly] = useState(false);

    const fetchContacts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/contacts');
            setContacts(response.data);
        } catch (err) {
            console.error("Error fetching contacts:", err);
            setError(true);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/contacts/${id}`);
            fetchContacts(); // Refresh contacts after deletion
        } catch (err) {
            console.error("Error deleting contact:", err);
            setError(true);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleShortlistToggle = async (contact) => {
        try {
            const updatedContact = {
                ...contact,
                shortlisted: !contact.shortlisted, // Toggle shortlisted status
            };

            await axios.put(`http://localhost:5000/api/contacts/${contact._id}/shortlisted`, {
                shortlisted: updatedContact.shortlisted,
            });

            fetchContacts(); // Refresh contacts to reflect changes
        } catch (err) {
            console.error("Error updating shortlisted status:", err);
            setError(true);
        }
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderContacts = () => {
        const contactsToDisplay = showShortlistedOnly
            ? filteredContacts.filter(contact => contact.shortlisted)
            : filteredContacts;

        return contactsToDisplay.map((contact) => (
            <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phoneNumber}</td>
                <td>{contact.message}</td>
                <td>
                    {/* Bootstrap toggle switch */}
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={`shortlistSwitch${contact._id}`}
                            checked={contact.shortlisted}
                            onChange={() => handleShortlistToggle(contact)}
                        />
                        <label className="form-check-label" htmlFor={`shortlistSwitch${contact._id}`}>
                            {contact.shortlisted ? 'Shortlisted' : 'Not Shortlisted'}
                        </label>
                    </div>
                </td>
                <td>
                    <button onClick={() => handleDelete(contact._id)} className="btn btn-danger">
                        Delete
                    </button>
                </td>
            </tr>
        ));
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div className="container">
            <h2 className="mt-4 text-center mb-4">Contact Messages</h2>

            {error && <div className="alert alert-danger">Error loading contacts</div>}

            <div className="row mb-4 align-items-center">
                <div className="col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Search by name, email, phone, or message..."
                        value={searchTerm}
                        onChange={handleSearch}
                        style={{ borderRadius: '0.375rem', border: '1px solid #ced4da' }} // For a more polished look
                    />
                </div>
                <div className="col-md-4 text-md-end text-center mt-3 mt-md-0">
                    <button
                        className={`btn btn-lg ${showShortlistedOnly ? 'btn-primary' : 'btn-outline-secondary'}`}
                        onClick={() => setShowShortlistedOnly(!showShortlistedOnly)}
                        style={{ width: '100%' }} // Makes the button full-width on smaller screens for a clean layout
                    >
                        {showShortlistedOnly ? 'Show All Contacts' : 'Show Shortlisted Only'}
                    </button>
                </div>
            </div>

            <table className="table table-hover table-bordered align-middle">
                <thead className="table-light">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Message</th>
                        <th>Shortlist</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {renderContacts()}
                </tbody>
            </table>
        </div>

    );
};

export default ContactDashboard;
