
// src/App.js
import React from 'react'; // Import React
import logo from './logo.svg';
import './App.css';
import AppRoutes from '../src/routes/Routes'; // Import the routes

function App() {
    return (
        <div>
            <AppRoutes /> {/* Use the routes here */}
        </div>
    );
}

export default App;

