// src/App.js
import React from 'react'; // Import React
import './Test.css'; // Import your CSS
import TopMenu from './core/TopMenu';
import Footer from './core/Footer';
import TopMenuTest from './core/TopMenuTest';
import Introduction from './pages/Home/Introduction/Introduction';
import Process from './pages/Home/Process/Process';
import Services from './pages/Home/Services/Services';
import Clients from './pages/Home/Clients/Clients';
import ContactInfo from './pages/Home/ContactInfo/ContactInfo';
import ThreeImg from './pages/Home/ThreeImg/ThreeImg';
import FAQ from './pages/Home/FAQ/FAQ';
import Testimonial from './pages/Home/Testimonial/Testimonial';
import Banner from './pages/Home/Banner/Banner';





function Test() {
    return (
        <>
            <TopMenuTest />
            {/* <div className='banner_section'>
                <div className='banner_content'>
                    <h1>Transform Your Space</h1>
                    <p>Innovative designs for a modern lifestyle</p>
                    <button className='cta_button'>Explore Now</button>
                </div>
            </div> */}
            <Banner />
            <Introduction />
            <Process />
            <Services />
            <Clients />
            <ContactInfo />

            <ThreeImg />
            <Testimonial />
            <FAQ />
            <Footer />
        </>
    );
}

export default Test;
