// src/App.js
import React from 'react'; // Import React
import './Banner.css'; // Import your CSS
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';

function Banner() {

    const notices = [
        "আমাদের ওয়েবসাইট মেনটেনেন্স এর কাজ চলছে সাময়িক অসুবিধার জন্য আমরা আন্তরিকভাবে দুঃখিত",
        "নতুন আপডেট আসছে শীঘ্রই, দয়া করে নজর রাখুন!",
        "বিশেষ অফার: সীমিত সময়ের জন্য আমাদের বিশেষ অফারটি উপভোগ করুন!"
    ];




    // Use &nbsp; for extra spaces between notices
    const separator = "  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  "; // Adjust the number of spaces here
    const scrollingNotices = notices.join(separator);


    return (
        <>




            <Marquee
                gradient="true"
                gradientWidth="0"
                className='mt-5 pb-3 bg-neutral font-bold text-xl text-dark'
                speed="40"
            >
                {/* Use dangerouslySetInnerHTML to handle HTML (like &nbsp;) */}
                <span dangerouslySetInnerHTML={{ __html: scrollingNotices }} />
            </Marquee>


            {/* Banner Section */}
            <div className='banner_section'>
                <div className='banner_content'>
                    <h1>Transform Your Space With <span>3P Communication</span></h1>
                    <p>Innovative designs for a modern lifestyle</p>
                    <Link to="/interior"><button className='cta_button'>Explore Now</button></Link>
                </div>
            </div>
        </>
    );
}

export default Banner;
