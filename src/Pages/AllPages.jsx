import React from 'react'
import { Routes,Route , BrowserRouter as Router} from "react-router-dom";
import Home from './Home';
import './Home.css'
const AllPages = () => {
  

    
    
   

  return (
    <div>
      <Router basename='/weather_forcast'>
        <Routes>
        <Route path="/" element={<Home/>}/>
        </Routes>
      </Router>

    </div>
  )
}

export default AllPages