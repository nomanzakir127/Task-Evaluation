import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import Home from '../components/Home';
import Login from '../components/Login';
import SignUp from '../components/SignUp';


function RoutesConfig() {
  return (
    <>
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/signup" element={<SignUp/>}/>
                <Route exact path="*" element={<Home/>} />
            </Routes> 
        </Router>
    </>
  );
}

export default RoutesConfig
