 
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//import ShopState from './context/shop/ShopState';
import './App.css';
import Home from './components/pages/Home';
import Navbar from './components/layout/Navbar';

import Shop from './components/pages/Shopdtails';
import Alerts from './components/layout/Alerts';
import Register from './components/auth/Register';
import Login  from './components/auth/Login';
import About from './components/pages/About';
import AlertState from './context/alert/AlertState';
import PrivateRoute from './components/routing/PrivateRoute';
import ContactPage from './components/pages/Displaycontact';
import AuthState from './context/auth/AuthState';
import ContactState from './context/contact/ContactState';


const App = () =>{ 
  
    return (
    // <ShopState>
      <AuthState>
        <ContactState>
          <AlertState>
            <Router>
              <Fragment>
                <Navbar />
                <div className='container'>
                  <Alerts />
                  <Routes>
                    <Route exact path='/' element={<Home />} /> 
                    <Route path='about' element={<About />} />
                    <Route exact path='/shop/:id' element={<Shop />} />
                    <Route exact path='contact' element={<PrivateRoute component={ContactPage} />} />
                    <Route exact path='register' element={<Register />} />
                    <Route exact path='login' element={<Login />} />
                  </Routes>
                </div>
              </Fragment>
            </Router>
          </AlertState>
        </ContactState>
      </AuthState>
    // </ShopState>
    );
  
}

export default App;