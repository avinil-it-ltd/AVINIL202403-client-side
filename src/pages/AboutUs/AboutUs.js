import React, { useState, useEffect } from "react";
import TopMenu from "../../core/TopMenu";
import Footer from "../../core/Footer";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { zoomIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import profile from '../../assets/images/about/ceo.png'; // Placeholder for CEO image
import projectComplete from '../../assets/images/project.png';
import award from '../../assets/images/award.png';
import client from '../../assets/images/happyClient.png';
import servicespic from '../../assets/images/customer-service.png';
import centralPic from '../../assets/images/about/central.jpg';
import './About.css'
const AboutUs = () => {
  const [aboutData, setAboutData] = useState(null);
  const ZoomIn = styled.div`animation: 3s ${keyframes`${zoomIn}`}`;

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/about'); // Adjust the API endpoint as necessary
        setAboutData(response.data);
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    };

    fetchAboutData();
  }, []);

  const process = () => (
    <div className="mt-0" style={{ height: "auto" }}>
      <div style={{ opacity: "0.9", height: "auto" }}>
        <h1 className="text-center mt-0 p-5 heading_color" style={{ fontFamily: "'Aref Ruqaa', serif" }}>Our Process</h1>
        <div className="row p-5">
          <div className="col-12 col-md-3 text-center p-2">
            <div className="mx-auto row align-items-center" style={{ height: "150px", width: "150px" }}>
              <img src={projectComplete} alt="" />
            </div>
            <div className="mt-4 h5 heading_color text-center" style={{ fontFamily: "'Aref Ruqaa', serif" }}>{aboutData?.statistics?.projectsCompleted}+ PROJECTS COMPLETED</div>
          </div>
          <div className="col-12 col-md-3 text-center p-2">
            <div className="mx-auto row align-items-center" style={{ height: "150px", width: "150px" }}>
              <img src={award} alt="" />
            </div>
            <div className="mt-4 h5 heading_color text-center" style={{ fontFamily: "'Aref Ruqaa', serif" }}>{aboutData?.statistics?.awardsReceived}+ AWARDS RECEIVED</div>
          </div>
          <div className="col-12 col-md-3 text-center p-2">
            <div className="mx-auto row align-items-center" style={{ height: "150px", width: "150px" }}>
              <img src={client} alt="" />
            </div>
            <div className="mt-4 h5 heading_color text-center" style={{ fontFamily: "'Aref Ruqaa', serif" }}>{aboutData?.statistics?.happyCustomers}+ HAPPY CUSTOMERS</div>
          </div>
          <div className="col-12 col-md-3 text-center p-2">
            <div className="mx-auto row align-items-center" style={{ height: "150px", width: "150px" }}>
              <img src={servicespic} alt="" />
            </div>
            <div className="mt-4 h5 heading_color text-center" style={{ fontFamily: "'Aref Ruqaa', serif" }}>{aboutData?.statistics?.yearsInService}+  YEARS IN SERVICE</div>
          </div>
        </div>
      </div>
    </div>
  );

  const ChooseMe = () => (
    <div className="container my-5 pt-5">
      <h2 className="heading_color py-5 text-center">Why Choose Us?</h2>
      <div className="row justify-content-center align-items-center">
        {/* Left Circle Sections */}
        <div className="col-4">
          {aboutData?.whyChooseUs?.slice(0, 3).map((item, index) => (
            <div key={index} className="circle-section mb-4">
              <img
                src={item.imageUrl} // Use the image URL from your backend
                alt={`Why Choose Us - ${item.title}`} // Descriptive alt text
                className="circle-img"
              />
              <div className="text-start ps-3">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Center Circle Image with Border */}
        <div className="col-4 text-center">
          <div className="center-circle-container">
            <img
              src={aboutData?.centralImage} // Assuming you might have a central image in your data
              alt="Center Circle"
              className="center-circle"
            />
          </div>
        </div>

        {/* Right Circle Sections */}
        <div className="col-4 text-center">
          {aboutData?.whyChooseUs?.slice(3).map((item, index) => (
            <div key={index} className="circle-section mb-4">
              <img
                src={item.imageUrl} // Use the image URL from your backend
                alt={`Why Choose Us - ${item.title}`} // Descriptive alt text
                className="circle-img"
              />
              <div className="text-start ps-3">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );


  if (!aboutData) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="container" style={{ maxWidth: "100vw" }}>
      <TopMenu />
      <div className="row">
        <div className="col-12 pt-5 mt-5 d-flex justify-content-center">
          <div className="col-md-4 text-center">
            <div className="profile-card  rounded bg-light p-4 shadow mx-auto">
              <img
                src={profile} // Optionally replace with dynamic profile image from backend
                alt="Profile"
                className="img-fluid rounded-circle border border-white mb-3 mt-3"
                style={{ width: "100%", height: "270px", objectFit: "cover" }}
              />
              <h4
                className="heading_color mb-0"
                style={{ fontFamily: "'Aref Ruqaa', serif" }}
              >
                {aboutData.profile.name}
              </h4>
              <p
                className="text-muted"
                style={{ fontFamily: "'Aref Ruqaa', serif" }}
              >
                {aboutData.profile.position}
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 text-center mt-4">
          <h3
            className="heading_color mt-3 mb-3"
            style={{ fontFamily: "'Aref Ruqaa', serif" }}
          >
            Get To Know Our Director
          </h3>
          <div className="introduction-text my-auto" style={{ maxWidth: "600px", margin: "0 auto" }}>
            <p className="text-black">
              {aboutData.profile.introduction}
            </p>
          </div>
        </div>
      </div>


      <div>{ChooseMe()}</div>
      <div>{process()}</div>
      <div id="contact" className="g-0">
        <Footer />
      </div>
    </div>
  );
}

export default AboutUs;
