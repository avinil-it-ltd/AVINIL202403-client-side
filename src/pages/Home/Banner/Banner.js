// src/App.js
import React from 'react'; // Import React
import './Banner.css'; // Import your CSS
import { Link } from 'react-router-dom';
// import TopMenu from './core/TopMenu';
// import Footer from './core/Footer';


function Banner() {
    return (
        <>
            {/* <TopMenu /> */}
            <div className='banner_section'>
                <div className='banner_content'>
                    <h1>Transform Your Space With <span className=''>3P Communication</span></h1>
                    <p>Innovative designs for a modern lifestyle  </p>
                    <Link to="/interior"> <button className='cta_button'>Explore Now</button></Link>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
}

export default Banner;
