import logo from './logo.svg';
import './App.css';
import RoutePages from './RoutePages';
import {BrowserRouter,Routes,Route} from "react-router-dom"

import Home from "./Home"
// import Project from "./Project"
// import Projects from "./Projects"
import Architecture from "./Architecture"
import Design from "./Design"
import Interior from "./Interior"
import IndexHome from "./IndexHome"
import SearchResult from "./SearchResult"
import Contact from "./Contact"
import AboutUs from './AboutUs/AboutUs';
import PrivacyPolicy from './PrivacyPolicy/PrivacyPolicy';
import FAQ from './FAQ/FAQ';





function App() {
  return (
   <Routes>
      <Route  path="/" element={<IndexHome/>}></Route>
     {/* <Route path="/projects" element={ <Projects/> }></Route> */}
     <Route path="/exterior" element={ <Architecture/> }></Route>
     <Route path="/event" element={ <Design/> }></Route>
     <Route path="/interior" element={ <Interior/> }></Route>
    {/*<Route  path="/projects/:projectId" element={<Project/>}></Route>*/}
		<Route  path="/aboutus" element={<AboutUs/>}></Route>
     <Route  path="/projects/search/:searchkey" element={<SearchResult/>}></Route>
     <Route  path="/contactus" element={<Contact/>}></Route>
     <Route  path="/privacyPolicy" element={<PrivacyPolicy/>}></Route>
     <Route  path="/faq" element={<FAQ/>}></Route>


   </Routes>
  );
}

export default App;
