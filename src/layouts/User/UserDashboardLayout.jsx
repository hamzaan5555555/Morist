import React from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import NavbarTourist from "@/compenment/NavbarTourist/NavbarTourist.jsx";
import NavbarGuide from "@/compenment/NavbarGuide/NavbarGuide.jsx";
import Footer from '../../../src/compenment/Footer/Footer.jsx'
import {LOGIN_ROUTE, USER_DASHBOARD_ROUTE} from "../../router/index.jsx";
import {useEffect, useState} from "react";

const Layout = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})

  useEffect(() => {
    if (!window.localStorage.getItem('ACCESS_TOKEN')) {
      navigate(LOGIN_ROUTE)
    }
    //axiosClient.get('/user').then(({data}) => {
    //  setUser(data)
    //})
  }, []);
  
  
  if (window.localStorage.getItem('TYPE_COMPTE') == "Tourist") {
    return (
        <>
        <NavbarTourist/>
        <main>
            <Outlet/>

        </main>
            <Footer/>

        </>
    );
	
  } else {
    return (
        <>
        <NavbarGuide/>
        <main>
            <Outlet/>

        </main>
            <Footer/>

        </>
    );
	
  }
};

export default Layout;