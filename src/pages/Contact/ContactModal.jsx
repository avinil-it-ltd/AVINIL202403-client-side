import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./css/ContactModal.css"; // Import the CSS for styling

function ContactModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [interest, setInterest] = useState("");
  const [contactDetails, setContactDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/Contacts"); // Adjust the URL as needed
        if (!response.ok) {
          throw new Error("Failed to fetch contact details");
        }
        const data = await response.json();
        setContactDetails(data);
      } catch (error) {
        console.error("Error fetching contact details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactDetails();
  }, []);

  const clickSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phoneNo,
          message: interest,
        }),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Thank you. Our team will contact you soon.",
          confirmButtonColor: "#28a745",
        });
        setName("");
        setEmail("");
        setPhoneNo("");
        setInterest("");
        onClose(); // Close modal on successful submission
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-header">
          <h2>Contact Us</h2>
        </div>
        {loading ? (
          <p>Loading contact details...</p>
        ) : contactDetails ? (
          <div className="modal-details">
            <p><strong>Address:</strong> {contactDetails.address}</p>
            <p><strong>Phone:</strong> {contactDetails.mobile}</p>
            <p><strong>Email:</strong> {contactDetails.email}</p>
          </div>
        ) : (
          <p>Contact details not available</p>
        )}
        <form onSubmit={clickSubmit} className="modal-form">
          <label>Name:</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
            required
          />
          <label>Email:</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
            required
          />
          <label>Phone No:</label>
          <input
            onChange={(e) => setPhoneNo(e.target.value)}
            type="text"
            value={phoneNo}
            required
          />
          <label>Message:</label>
          <textarea
            rows="4"
            onChange={(e) => setInterest(e.target.value)}
            value={interest}
            required
          ></textarea>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ContactModal;
