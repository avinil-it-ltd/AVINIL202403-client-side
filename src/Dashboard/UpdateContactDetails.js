import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

const UpdateContactDetails = () => {
  const [contactDetails, setContactDetails] = useState({
    address: '',
    mobile: '',
    email: '',
    fbLink: '',
    whatsappLink: '',
    youtubeLink: '',
  });

  const [showModal, setShowModal] = useState(false);

  // Fetch existing contact details
  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/myContact');
        const data = await response.json();
        setContactDetails(data);
      } catch (error) {
        console.error('Error fetching contact details:', error);
      }
    };

    fetchContactDetails();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const handleConfirmUpdate = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/myContact', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactDetails),
      });
      
      if (response.ok) {
        const updatedContact = await response.json();
        console.log('Contact details updated:', updatedContact);
        
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Updated successfully!',
          position: 'center',
          showConfirmButton: true,
          confirmButtonColor: '#28a745',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update contact details.',
        });
      }
    } catch (error) {
      console.error('Error updating contact details:', error);
    }

    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactDetails({
      ...contactDetails,
      [name]: value,
    });
  };

  return (
    <Container className="my-5 card p-5 shadow-sm">
      <h2 className="text-center mb-4">Update Contact Details</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={contactDetails.address}
                onChange={handleInputChange}
                placeholder="Enter address"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group controlId="formMobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                value={contactDetails.mobile}
                onChange={handleInputChange}
                placeholder="Enter mobile number"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={contactDetails.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group controlId="formFbLink">
              <Form.Label>Facebook Link</Form.Label>
              <Form.Control
                type="url"
                name="fbLink"
                value={contactDetails.fbLink}
                onChange={handleInputChange}
                placeholder="Enter Facebook page/profile URL"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Group controlId="formWhatsappLink">
              <Form.Label>WhatsApp Link</Form.Label>
              <Form.Control
                type="url"
                name="whatsappLink"
                value={contactDetails.whatsappLink}
                onChange={handleInputChange}
                placeholder="Enter WhatsApp contact link"
              />
            </Form.Group>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group controlId="formYoutubeLink">
              <Form.Label>YouTube Link</Form.Label>
              <Form.Control
                type="url"
                name="youtubeLink"
                value={contactDetails.youtubeLink}
                onChange={handleInputChange}
                placeholder="Enter YouTube channel link"
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="mt-3">
          Update Contact Details
        </Button>
      </Form>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to update the contact details?</p>
          <p><strong>Address:</strong> {contactDetails.address}</p>
          <p><strong>Mobile:</strong> {contactDetails.mobile}</p>
          <p><strong>Email:</strong> {contactDetails.email}</p>
          <p><strong>Facebook Link:</strong> <span title={contactDetails.fbLink}>{contactDetails.fbLink}</span></p>
          <p><strong>WhatsApp Link:</strong> <span title={contactDetails.whatsappLink}>{contactDetails.whatsappLink}</span></p>
          <p><strong>YouTube Link:</strong> <span title={contactDetails.youtubeLink}>{contactDetails.youtubeLink}</span></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmUpdate}>
            Confirm Update
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UpdateContactDetails;
