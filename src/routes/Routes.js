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
import Contact from '../Contact';
import CareerList from '../Dashboard/CareerList';
import AddCareer from '../Dashboard/AddCareer';
import UpdateCareer from '../Dashboard/UpdateCareer';
import CareerApplicationForm from '../pages/Career/CareerApplicationForm';
import Architecture from '../Architecture';
import Interior from '../Interior';
import FAQ from '../pages/FAQ/FAQ';
import PrivacyPolicy from '../pages/PrivacyPolicy/PrivacyPolicy';
import AboutUs from '../pages/AboutUs/AboutUs';
import CareerPage from '../pages/Career/CareerPage';
import Login from '../Auth/Login/Login';
import ApplicationList from '../Dashboard/ApplicationList';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<IndexHome />} />
            <Route path="/exterior" element={<Architecture />} />
            {/* <Route path="/event" element={<Design />} /> */}
            <Route path="/interior" element={<Interior />} />
            <Route path="/aboutus" element={<AboutUs />} />
            {/* <Route path="/projects/search/:searchkey" element={<SearchResult />} /> */}
            <Route path="/contactus" element={<Contact />} />
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/faq" element={<FAQ/>} />
          

            <Route path="/dashboard" element={<Dashboard />}>
                {/* <Route index element={<DashboardMain />} /> Default content for /dashboard */}
                <Route path="updateProject" element={<ProjectListForUpdate />} />
                <Route path="updateProject/:id" element={<UpdateProject />} />

                <Route path="changeImage" element={<ChangeImage />} />
                {/* <Route path="changeCredentials" element={<ChangeCredentials />} /> */}
                <Route path="projects" element={<ProjectList />} /> {/* Add this line */}
                <Route path="addProject" element={<AddProject />} /> {/* Add this line */}

                {/* Career-related routes */}
                <Route path="careers" element={<CareerList />} /> {/* List all careers */}
                <Route path="addCareer" element={<AddCareer />} /> {/* Add a new career */}
                <Route path="updateCareer/:id" element={<UpdateCareer />} /> {/* Update an existing career */}
                <Route path="applications" component={ApplicationList} />
            </Route>
            <Route path="careers" element={<CareerPage/>} /> {/* List all careers */}
            <Route path="applyCareer/:id" element={<CareerApplicationForm />} /> {/* Career application form */}
              <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default AppRoutes;

