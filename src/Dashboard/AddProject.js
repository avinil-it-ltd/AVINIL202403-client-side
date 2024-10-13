import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProject = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [mainImage, setMainImage] = useState(null);
    const [additionalImages, setAdditionalImages] = useState([]);

    const [projectData, setProjectData] = useState({
        title: '',
        category: '',
        subcategory: '',
        description: '',
        client: {
            name: '',
            email: '',
            phone: ''
        },
        review: {
            rating: '',
            comment: ''
        },
        startDate: '',
        endDate: ''
    });

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Failed to load categories. Please try again later.');
            }
        };
        fetchCategories();
    }, []);

    // Utility to format date to "yyyy-MM-dd" for input[type="date"]
    const formatDate = (dateString) => {
        if (!dateString) return '';
        return dateString.split('T')[0]; // Extract "yyyy-MM-dd"
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('client')) {
            setProjectData(prevState => ({
                ...prevState,
                client: {
                    ...prevState.client,
                    [name.split('.')[1]]: value
                }
            }));
        } else if (name.includes('review')) {
            setProjectData(prevState => ({
                ...prevState,
                review: {
                    ...prevState.review,
                    [name.split('.')[1]]: value
                }
            }));
        } else if (name === 'startDate' || name === 'endDate') {
            // Format date before updating state
            setProjectData(prevState => ({
                ...prevState,
                [name]: formatDate(value) // Use the formatDate function here
            }));
        } else {
            setProjectData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        const selectedCategoryData = categories.find(cat => cat.name === selectedCategory);

        setProjectData(prevState => ({
            ...prevState,
            category: selectedCategory,
            subcategory: ''
        }));

        if (selectedCategoryData) {
            setSubcategories(selectedCategoryData.subcategories);
        } else {
            setSubcategories([]);
        }
    };

    // Upload image to Cloudinary
    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', '3pcommunications'); // Replace with your Cloudinary upload preset

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/avinilit/image/upload`, formData);
            return response.data.secure_url; // Return the uploaded image URL
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            // Upload main image
            let mainImageUrl = '';
            if (mainImage) {
                mainImageUrl = await uploadImageToCloudinary(mainImage);
            }

            // Upload additional images
            const additionalImageUrls = await Promise.all(
                additionalImages.filter(image => image).map(image => uploadImageToCloudinary(image))
            );

            // Prepare project data
            const dataToSubmit = {
                title: projectData.title,
                category: projectData.category,
                subcategory: projectData.subcategory,
                description: projectData.description,
                client: projectData.client,
                review: projectData.review,
                startDate: formatDate(projectData.startDate), // Format date here
                endDate: formatDate(projectData.endDate), // Format date here
                mainImage: mainImageUrl,
                additionalImages: additionalImageUrls // Ensure we're sending the URLs
            };

            const response = await axios.post('http://localhost:5000/api/projects', dataToSubmit);
            setMessage('Project added successfully!');
            setProjectData({
                title: '',
                category: '',
                subcategory: '',
                client: {
                    name: '',
                    email: '',
                    phone: ''
                },
                review: {
                    rating: '',
                    comment: ''
                },
                startDate: '',
                endDate: '',
                description: ''
            });
            setMainImage(null);
            setAdditionalImages([]);
        } catch (error) {
            setError('Error adding project. Please try again.');
            console.error('Submission error:', error);
            console.error('Submission error:', error.response.data.error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Add New Project</h2>
            {message && <div className="alert alert-info">{message}</div>}
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Project Title</label>
                    <input
                        type="text"
                        name="title"
                        value={projectData.title}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Main Image</label>
                    <input
                        type="file"
                        name="mainImage"
                        onChange={(e) => setMainImage(e.target.files[0])}
                        className="form-control"
                        accept="image/*"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Additional Images</label>
                    <input
                        type="file"
                        name="additionalImages"
                        onChange={(e) => setAdditionalImages(Array.from(e.target.files))}
                        className="form-control"
                        accept="image/*"
                        multiple
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select
                        name="category"
                        value={projectData.category}
                        onChange={handleCategoryChange}
                        className="form-control"
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Subcategory</label>
                    <select
                        name="subcategory"
                        value={projectData.subcategory}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="">Select a subcategory</option>
                        {subcategories.map((subcategory, index) => (
                            <option key={index} value={subcategory.name}>
                                {subcategory.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={projectData.description}
                        onChange={handleChange}
                        className="form-control"
                        rows="3"
                        required
                    />
                </div>
                <h3 className="mt-4">Client Details</h3>
                <div className="form-group">
                    <label>Client Name</label>
                    <input
                        type="text"
                        name="client.name"
                        value={projectData.client.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Client Email</label>
                    <input
                        type="email"
                        name="client.email"
                        value={projectData.client.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Client Phone</label>
                    <input
                        type="text"
                        name="client.phone"
                        value={projectData.client.phone}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <h3 className="mt-4">Client Review</h3>
                <div className="form-group">
                    <label>Rating</label>
                    <input
                        type="number"
                        name="review.rating"
                        value={projectData.review.rating}
                        onChange={handleChange}
                        className="form-control"
                        min="1"
                        max="5"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Comment</label>
                    <textarea
                        name="review.comment"
                        value={projectData.review.comment}
                        onChange={handleChange}
                        className="form-control"
                        rows="3"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        value={projectData.startDate}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        value={projectData.endDate}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary mt-3">Add Project</button>
            </form>
        </div>
    );
};

export default AddProject;
