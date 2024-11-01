import React, { useEffect, useState } from "react";
import facebookImg from '../assets/images/facebook.png';
import youtubeImg from '../assets/images/youtube.png';
import whatsappImg from '../assets/images/whatsapp.png';
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  const [contactDetails, setContactDetails] = useState(null); // State to hold contact details
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/myContact'); // Adjust the URL as needed
        if (!response.ok) {
          throw new Error('Failed to fetch contact details');
        }
        const data = await response.json();
        setContactDetails(data);
      } catch (error) {
        console.error('Error fetching contact details:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchContactDetails();
  }, []); // Empty dependency array to run only once

  return (
    <div>
      <footer className="bg-dark text-white pt-5 px-3 pb-3">
        <Container>
          <Row>

            <Col md={4} className="mb-4 mb-md-0">
              <h5>Important Links</h5>
              <ul className="list-unstyled mt-3">
                <li><a href="/aboutus" className="text-white text-decoration-none">About Us</a></li>
                <li className="my-2"><a href="/contactus" className="text-white text-decoration-none">Contact Us</a></li>
                <li className="my-2"><a href="/privacyPolicy" className="text-white mt-2 text-decoration-none">Privacy Policy</a></li>
              </ul>
            </Col>

            <Col md={4}>
              <h5>Contact Us</h5>
              {loading ? (
                <p>Loading contact details...</p>
              ) : contactDetails ? (
                <>
                  <p className="mt-3">Address: {contactDetails.address}</p>
                  <p>Email: {contactDetails.email}</p>
                  <p>Phone: {contactDetails.mobile}</p>
                  <div className="mt-4">
                    <a href={contactDetails.fbLink} target="_blank" rel="noopener noreferrer" className="text-white me-3">
                      <img width="30px" src={facebookImg} alt="Facebook" />
                    </a>
                    <a href={contactDetails.whatsappLink} target="_blank" rel="noopener noreferrer" className="ms-2 text-white me-3">
                      <img width="30px" src={whatsappImg} alt="WhatsApp" />
                    </a>
                    <a href={contactDetails.youtubeLink} target="_blank" rel="noopener noreferrer" className="ms-2 text-white me-3">
                      <img width="30px" src={youtubeImg} alt="YouTube" />
                    </a>
                  </div>
                </>
              ) : (
                <p className="mt-3">Contact details not found.</p>
              )}
            </Col>

            <Col md={4} className="mb-4 mb-md-0">
              <div className="w-75">
                <label htmlFor="subscriberEmail callNow_font">Subscribe to our newsletter</label>
                <div className="input-group mt-2">
                  <input
                    type="email"
                    id="subscriberEmail"
                    name="subscriberEmail"
                    className="form-control p-3"
                    placeholder="Enter your email"
                  />
                  <button className="btn subscribeButton" type="button">Subscribe</button>
                </div>
              </div>
            </Col>

          </Row>
        </Container>
        <hr />
        <div className="bg-dark text-white text-center fw-bold">
          <div className="text-center mx-5 pt-3">
            <p>&copy; 3p Communication All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
