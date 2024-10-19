import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

const UpdateProject = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // State for project, categories, images, and form feedback
    const [project, setProject] = useState({
        title: '',
        category: '',
        subcategory: '',
        client: { name: '', email: '', phone: '' },
        review: { rating: '', comment: '' },
        startDate: '',
        endDate: '',
        description: '',
        mainImage: '',
        additionalImages: [],
    });
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [mainImage, setMainImage] = useState(null);
    const [additionalImages, setAdditionalImages] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleteMainImage, setDeleteMainImage] = useState(false);

    // Utility to format date to "yyyy-MM-dd" for input[type="date"]
    const formatDate = (dateString) => {
        if (!dateString) return '';
        return dateString.split('T')[0]; // Extract "yyyy-MM-dd"
    };

    // Fetch project details and categories
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`https://3pcommunicationsserver.vercel.app/api/projects/${id}`);
                const fetchedProject = response.data.project;

                // Format startDate and endDate
                setProject({
                    ...fetchedProject,
                    startDate: formatDate(fetchedProject.startDate),
                    endDate: formatDate(fetchedProject.endDate)
                });
            } catch (error) {
                setError('Error fetching project details.');
            } finally {
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://3pcommunicationsserver.vercel.app/api/categories');
                setCategories(response.data);
            } catch (error) {
                setError('Failed to load categories. Please try again later.');
            }
        };

        fetchCategories();
        fetchProject();
    }, [id]);

    // Update subcategories based on the selected category
    useEffect(() => {
        const selectedCategory = project.category;
        const selectedCategoryData = categories.find(cat => cat.name === selectedCategory);
        if (selectedCategoryData) {
            setSubcategories(selectedCategoryData.subcategories);
        }
    }, [categories, project.category]);

    // Handle input changes for form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('client')) {
            setProject(prevState => ({
                ...prevState,
                client: {
                    ...prevState.client,
                    [name.split('.')[1]]: value
                }
            }));
        } else if (name.includes('review')) {
            setProject(prevState => ({
                ...prevState,
                review: {
                    ...prevState.review,
                    [name.split('.')[1]]: value
                }
            }));
        } else {
            setProject(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    // Handle category change and update subcategories accordingly
    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        const selectedCategoryData = categories.find(cat => cat.name === selectedCategory);

        setProject(prevState => ({
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


    // Handle additional images change
    const handleAdditionalImagesChange = (e) => {
        setAdditionalImages([...e.target.files]);
    };
    const handleDeleteAdditionalImage = (indexToDelete) => {
        setProject((prevProject) => {
          const updatedImages = prevProject.additionalImages.filter((_, index) => index !== indexToDelete);
          return { ...prevProject, additionalImages: updatedImages };
        });
      };
      
    // Function to upload image to Cloudinary
    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.CLOUDINARY_CLOUD_NAME);

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/avinilit/image/upload`, formData);
            return response.data.secure_url;
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            throw error;
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            let mainImageUrl = project.mainImage;

            // Delete the main image if the delete flag is set
            if (deleteMainImage) {
                mainImageUrl = '';
            } else if (mainImage && typeof mainImage === 'object') {
                // Upload main image if a new one is selected
                mainImageUrl = await uploadImageToCloudinary(mainImage);
            }

            let additionalImageUrls = project.additionalImages;

            // Upload additional images if any new ones are selected
            if (additionalImages.length > 0) {
                const newAdditionalImageUrls = await Promise.all(
                    additionalImages.map(image => uploadImageToCloudinary(image))
                );
    
                // Combine the existing images with the newly uploaded ones
                additionalImageUrls = [...additionalImageUrls, ...newAdditionalImageUrls];
            }

            const dataToSubmit = {
                ...project,
                mainImage: mainImageUrl,
                additionalImages: additionalImageUrls,
                deleteMainImage,
            };

            await axios.put(`https://3pcommunicationsserver.vercel.app/api/projects/${id}`, dataToSubmit);
            navigate('/dashboard/projects');
        } catch (error) {
            setError('Error updating project. Please try again.');
        }
    };


    // Render the form or display loading/error messages
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    return (
        <div className="container mt-5">
          <h2 className="text-center mb-4">Update Project</h2>
      
          <button
            type="button"
            className="btn btn-secondary mt-3 mb-4"
            onClick={() => navigate('/dashboard/projects')}
          >
            Back to Project List
          </button>
      
          <form onSubmit={handleSubmit} className="border p-4 shadow-sm bg-light rounded">
            {/* Project Title */}
            <div className="form-group mb-3">
              <label>Project Title</label>
              <input
                type="text"
                name="title"
                value={project.title}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
      
            {/* Main Image */}
            <div className="form-group mb-3">
              <label>Main Image</label>
              <input
                type="file"
                name="mainImage"
                onChange={(e) => setMainImage(e.target.files[0])}
                className="form-control"
                accept="image/*"
              />
              {project.mainImage && (
                <div className="mt-2 position-relative">
                  <img
                    src={project.mainImage}
                    alt="Main"
                    className="img-thumbnail"
                    style={{ maxWidth: '100px', height: 'auto' }}
                  />
                  <button
                    type="button"
                    className="btn btn-danger btn-sm position-absolute"
                    style={{ top: 0, right: 0 }}
                    onClick={() => setProject({ ...project, mainImage: '' })}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
      
            {/* Additional Images */}
            <div className="form-group mb-3">
              <label>Additional Images</label>
              <input
                type="file"
                name="additionalImages"
                onChange={handleAdditionalImagesChange}
                className="form-control"
                accept="image/*"
                multiple
              />
              {project.additionalImages.length > 0 && (
                <div className="mt-2 d-flex flex-wrap gap-2">
                  {project.additionalImages.map((img, index) => (
                    <div key={index} className="position-relative">
                      <img
                        src={img}
                        alt={`Additional ${index + 1}`}
                        className="img-thumbnail"
                        style={{ maxWidth: '100px', height: 'auto' }}
                        
                      />
                      <button
                        type="button"
                        className="btn btn-danger btn-sm position-absolute"
                        style={{ top: 0, right: 0 }}
                        onClick={() => handleDeleteAdditionalImage(index)}
                      >
                       <FaTrash /> {/* Trash icon instead of "Delete" text */}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
      
            {/* Category */}
            <div className="form-group mb-3">
              <label>Category</label>
              <select
                name="category"
                value={project.category}
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
      
            {/* Subcategory */}
            <div className="form-group mb-3">
              <label>Subcategory</label>
              <select
                name="subcategory"
                value={project.subcategory}
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
      
            {/* Description */}
            <div className="form-group mb-3">
              <label>Description</label>
              <textarea
                name="description"
                value={project.description}
                onChange={handleChange}
                className="form-control"
                rows="3"
                required
              />
            </div>
      
            {/* Client Details */}
            <h3 className="mt-4">Client Details</h3>
            <div className="form-group mb-3">
              <label>Client Name</label>
              <input
                type="text"
                name="client.name"
                value={project.client.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Client Email</label>
              <input
                type="email"
                name="client.email"
                value={project.client.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Client Phone</label>
              <input
                type="text"
                name="client.phone"
                value={project.client.phone}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
      
            {/* Client Review */}
            <h3 className="mt-4">Client Review</h3>
            <div className="form-group mb-3">
              <label>Rating</label>
              <input
                type="number"
                name="review.rating"
                value={project.review.rating}
                onChange={handleChange}
                className="form-control"
                min="1"
                max="5"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Comment</label>
              <textarea
                name="review.comment"
                value={project.review.comment}
                onChange={handleChange}
                className="form-control"
                rows="3"
                required
              />
            </div>
      
            {/* Start and End Date */}
            <div className="form-group mb-3">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={project.startDate}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
      
            <div className="form-group mb-3">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={project.endDate}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
      
            {/* Submit Button */}
            <div className="text-center">
              <button type="submit" className="btn btn-primary mt-3">
                Update Project
              </button>
            </div>
      
            {/* Error Handling */}
            {error && <p className="text-danger mt-3">{error}</p>}
          </form>
        </div>
      );
      

};

export default UpdateProject;