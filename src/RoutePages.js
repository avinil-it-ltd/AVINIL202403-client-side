import React from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom"

import Home from "./Home"

const RoutePages=()=>{
    return(
       
            <Routes>
              <Route  path="/" component={<Home/>}></Route>
              <Route  path="/saksham" component={Home}></Route>
            </Routes>
       
    )
}

export default RoutePages;