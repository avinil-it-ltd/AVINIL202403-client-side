import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopMenu from '../../core/TopMenu';
import Footer from '../../core/footer';

const CareerApplicationForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [careerId, setCareerId] = useState('');
    const [resume, setResume] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [careers, setCareers] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCareers = async () => {
            try {
                const response = await axios.get('https://3pcommunicationsserver.vercel.app/api/careers');
                setCareers(response.data);
            } catch (error) {
                console.error('Error fetching careers:', error);
                setError('Unable to fetch career positions. Please try again later.');
            }
        };
        fetchCareers();
    }, []);

    const handleResumeChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setResume(file);
        } else {
            setError('Only PDF files are allowed for resumes.');
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            setPhoto(file);
        } else {
            setError('Only JPEG and PNG files are allowed for photos.');
        }
    };

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', '3pcommunications');

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/avinilit/image/upload`, formData);
            return response.data.secure_url;
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setIsLoading(true);

        try {
            let photoUrl;
            if (photo) {
                photoUrl = await uploadImageToCloudinary(photo);
            }

            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phoneNumber', phoneNumber);
            formData.append('careerId', careerId);
            formData.append('resume', resume);
            if (photoUrl) {
                formData.append('photo', photoUrl);
            }

            const response = await axios.post('https://3pcommunicationsserver.vercel.app/api/applications', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage('Application submitted successfully!');
            setName('');
            setEmail('');
            setPhoneNumber('');
            setCareerId('');
            setResume(null);
            setPhoto(null);
        } catch (error) {
            console.error('Error submitting application:', error);
            setError(error.response?.data?.error || 'Failed to submit application. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container-fluid d-flex flex-column min-vh-100 p-0">
            <TopMenu />

            <div className="main_section row m-5">
                {/* Left side details with scroll */}
                <div className="col-lg-6 col-md-12 px-5" style={{ maxHeight: '90vh', overflowY: 'scroll', scrollbarWidth: 'thin' }}>

                    <h3>NLP ENGINEER MACHINE LEARNING</h3>

                    <p>Vacancy: 03</p>
                    <p>Salary: Negotiable</p>
                    <p>Job Location: Dhaka (Dhanmondi, Uttara), Chattogram</p>
                    <p>Experience: At least 2 year(s)</p>



                    <h5 className='mt-5 mb-3 '> Job Responsibilities</h5>
                    <p> We are seeking an experienced NLP Engineer to join our dynamic Machine Learning team. The ideal candidate will possess a strong background in data science, with a focus on natural language processing (NLP) and machine learning model development. You will play a crucial role in designing, implementing, and optimizing NLP models, particularly those based on Transformers and BERT.
                        Develop and implement state-of-the-art NLP models, including but not limited to Transformers and BERT.Conduct exploratory data analysis (EDA) to uncover insights and inform model development.
                        Automate EDA processes to streamline workflows and improve efficiency. Collaborate with cross-functional teams to gather requirements and deliver effective machine learning solutions.
                    </p>


                    <h5 className="mt-5 ">Employment Status</h5>
                    <p>Full-time</p>



                    <h5>Education Required</h5>
                    <ul>
                        <li>Bachelor’s or Master’s degree in Computer Science, Data Science, or a related field. </li>
                        <li>A degree can just earn the job, but it cannot help to grow further without the skill. </li>
                        <li> We care more about the person and his/her skills, not degrees or academic qualifications.</li>
                        <li>Proven experience in developing NLP applications using Python, with a strong understanding of libraries such as Hugging Face Transformers, TensorFlow, or PyTorch.</li>
                    </ul>



                    <h4>Experience Required</h4>
                    <ul>
                        <li>At least 2 years</li>
                        <li>Strong experience in data manipulation and analysis using libraries like Pandas, NumPy, and SciPy.</li>
                        <li>Expertise in advanced NLP techniques, especially BERT and Transformer models.</li>
                        <li> Extensive knowledge of probability, statistics, calculus, and linear algebra</li>
                        <li>Familiarity with EDA automation tools and techniques.</li>
                        <li> Understanding of machine learning concepts, model training, evaluation metrics, and deployment strategies.</li>
                        <li> Understanding of machine learning concepts, model training, evaluation metrics, and deployment strategies.</li>
                        <li> Understanding of machine learning concepts, model training, evaluation metrics, and deployment strategies.</li>
                    </ul>




                    <h5>Additional Requirements </h5>
                    <ul>
                        <li>Age at least 25 years</li>
                        <li>Both males and females are allowed to apply</li>
                    </ul>





                    <h5>Compensation & Other Benefits</h5>
                    <ul>
                        <li>Mobile bill, Provident fund, Weekly 2 holidays, Insurance</li>
                        <li>Lunch Facilities: Full Subsidize</li>
                        <li> Salary Review: Yearly</li>
                        <li>Festival Bonus: 2 (Yearly)</li>
                        <li>Annual Leave Encasement.</li>
                        <li>Unlimited Tea, Coffee & Snacks.</li>
                        <li> Paternity and Maternity Leave.</li>
                        <li>Knowledge Sharing Session.</li>
                    </ul>
                </div>




                {/* Fixed form on the right */}
                <div className="col-lg-6 col-md-12 p-5 bg-light rounded shadow-sm" style={{ position: 'sticky', top: '10px' }}>
                    <h2 className="text-center mb-4">Apply For This Post</h2>
                  
                    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phoneNumber"
                                placeholder="Enter your phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="career" className="form-label">Career Position:</label>
                            <select
                                id="career"
                                className="form-select"
                                value={careerId}
                                onChange={(e) => setCareerId(e.target.value)}
                                required
                            >
                                <option value="">Select a career</option>
                                {careers.map((career) => (
                                    <option key={career._id} value={career._id}>
                                        {career.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="resume" className="form-label">Upload Resume (PDF only):</label>
                            <input
                                type="file"
                                className="form-control"
                                id="resume"
                                accept="application/pdf"
                                onChange={handleResumeChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="photo" className="form-label">Upload Photo (JPEG, PNG only):</label>
                            <input
                                type="file"
                                className="form-control"
                                id="photo"
                                accept="image/jpeg, image/png"
                                onChange={handlePhotoChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-info text-white py-2 w-100" disabled={isLoading}>
                            {isLoading ? 'Submitting...' : 'Submit Application'}
                        </button>
                        {message && <div className="alert alert-success text-center" role="alert">{message}</div>}
                        {error && <div className="alert alert-danger text-center" role="alert">{error}</div>}
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CareerApplicationForm;











