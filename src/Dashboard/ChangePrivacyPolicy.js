import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const ChangePrivacyPolicy = () => {
    const [privacyPolicy, setPrivacyPolicy] = useState([
        "We at [Company Name] are committed to protecting your privacy.",
        "We collect personal details, project information, communication records, and website usage data.",
        "We use your information to provide services, communicate, process payments, market our services, and improve our offerings.",
        "We share your information with service providers, for legal requirements, and during business transfers.",
        "We implement measures to protect your personal information from unauthorized access and disclosure.",
        "Our website uses cookies to improve user experience and analyze usage.",
        "We are not responsible for the privacy practices of third-party sites linked on our website.",
        "We may update this policy and will notify you of any changes on our website.",
        "For questions or concerns, please contact us at [Contact Information]."
    ]);

    // Function to handle input change
    const handleInputChange = (index, value) => {
        const updatedPolicy = [...privacyPolicy];
        updatedPolicy[index] = value;
        setPrivacyPolicy(updatedPolicy);
    };

    // Function to add a new policy item
    const addPolicyItem = () => {
        setPrivacyPolicy([...privacyPolicy, ""]);
    };

    // Function to save the policy changes
    const handleSave = () => {
        console.log('Updated Privacy Policy:', privacyPolicy);
        alert('Privacy Policy Updated!');
    };

    return (
        <div className="container mt-4 card  p-4 shadow-lg w-75">
            <h2 className='text-center my-3 '>Update Privacy Policy</h2>
            <Form>
                {privacyPolicy.map((item, index) => (
                    <Form.Group controlId={`privacyPolicy${index}`} className="mb-3" key={index}>
                        <Form.Label className='fw-bold'>Policy Item {index + 1}</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={item}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                    </Form.Group>
                ))}

                <div className='d-flex justify-content-center align-items center my-5'>
                    <Button variant="btn btn-warning " onClick={addPolicyItem} className=" me-4">
                        Add More Policy Item
                    </Button>

                    <Button variant="dark" onClick={handleSave} className='ms-4'>
                        Save Changes
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default ChangePrivacyPolicy;



// import 'bootstrap/dist/css/bootstrap.min.css';
// Uncomment below if using React Quill
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';


{/* Uncomment the below to use React Quill as a rich text editor */ }
{/* 
                        <ReactQuill
                            value={item}
                            onChange={(value) => handleInputChange(index, value)}
                        /> 
                        */}