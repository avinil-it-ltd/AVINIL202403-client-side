// src/routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// import IndexHome from "./IndexHome";

// import Design from "./Design";

// import PrivacyPolicy from './PrivacyPolicy/PrivacyPolicy';

// import Login from './Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import UpdateProject from '../Dashboard/UpdateProject';
import ChangeImage from '../Dashboard/ChangeImage';
// import ChangeCredentials from './Dashboard/ChangeCredentials';
import ProjectList from '../Dashboard/ProjectList'; // Import your ProjectList component
import AddProject from '../Dashboard/AddProject';
import ProjectListForUpdate from '../Dashboard/ProjectListForUpdate';
import IndexHome from '../IndexHome';
import Contact from '../../src/pages/Contact/Contact.js';
import CareerList from '../Dashboard/CareerList';
import AddCareer from '../Dashboard/AddCareer';
import UpdateCareer from '../Dashboard/UpdateCareer';
import CareerApplicationForm from '../pages/Career/CareerApplicationForm';
import FAQ from '../pages/FAQ/FAQ';
import PrivacyPolicy from '../pages/PrivacyPolicy/PrivacyPolicy';
import AboutUs from '../pages/AboutUs/AboutUs';
import CareerPage from '../pages/Career/CareerPage';
import Login from '../Auth/Login/Login';

import ProjectsDetails from '../pages/ProjectsDetails/ProjectsDetails';
// import Interiror from '../pages/Interior/Interior';
import Exterior from '../pages/Exterior/Exterior';
import Interiror from '../pages/Interior/Interior';

// import ApplicationList from '../Dashboard/ApplicationList.js';
import CategoryManagement from '../Dashboard/CategoryManagement.js';
import ContactDashboard from '../Dashboard/ContactDashboard.js';
import DashboardMain from '../Dashboard/DashboardMain.js';
import ChangeAboutDetails from '../Dashboard/ChangeAboutDetails.js';
import UpdateContactDetails from '../Dashboard/UpdateContactDetails.js';
import ApplicationList from '../Dashboard/ApplicationList.js';





const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<IndexHome />} />
            <Route path="/exterior" element={<Exterior />} />
            {/* <Route path="/event" element={<Design />} /> */}
            <Route path="/interior" element={<Interiror />} />
            <Route path="/aboutus" element={<AboutUs />} />
            {/* <Route path="/projects/search/:searchkey" element={<SearchResult />} /> */}
            <Route path="/contactus" element={<Contact />} />
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/faq" element={<FAQ />} />

            <Route path="/details/:id" element={<ProjectsDetails />} />




            <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<DashboardMain />} /> 
                <Route path="updateProject" element={<ProjectListForUpdate />} />
                <Route path="updateproject/:id" element={<UpdateProject />} />

                <Route path="changeImage" element={<ChangeImage />} />
                {/* <Route path="changeCredentials" element={<ChangeCredentials />} /> */}
                <Route path="projects" element={<ProjectList />} /> {/* Add this line */}
                <Route path="addProject" element={<AddProject />} /> {/* Add this line */}


                <Route path="contactDashboard" element={<ContactDashboard />} /> {/* Add this line */}

                {/* Career-related routes */}
                <Route path="careers" element={<CareerList />} /> {/* List all careers */}
                <Route path="addCareer" element={<AddCareer />} /> {/* Add a new career */}
                <Route path="updateCareer/:id" element={<UpdateCareer />} /> {/* Update an existing career */}
                <Route path="applications" element={<ApplicationList/>} />
                <Route path="categories" element={<CategoryManagement/>} />
                <Route path="UpdateAboutDetails" element={<ChangeAboutDetails/>} />
                <Route path="UpdateContactDetails" element={<UpdateContactDetails/>} />
            </Route>



            <Route path="careers" element={<CareerPage />} /> {/* List all careers */}
            <Route path="applyCareer/:id" element={<CareerApplicationForm />} /> {/* Career application form */}
            <Route path="/login" element={<Login />} />
            
            {/* <Route path="newpage" element={NewPage} /> */}
          

        </Routes>
    );
};

export default AppRoutes;

