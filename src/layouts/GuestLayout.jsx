import React from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import Navbar from "@/compenment/Navbar/Navbar.jsx";
import Footer from '../../src/compenment/Footer/Footer.jsx'
import {LOGIN_ROUTE, USER_DASHBOARD_ROUTE} from "../router/index.jsx";
import {useEffect, useState} from "react";

const Layout = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})

  useEffect(() => {
    if (window.localStorage.getItem('ACCESS_TOKEN')) {
      navigate(USER_DASHBOARD_ROUTE)
    }
    //axiosClient.get('/user').then(({data}) => {
    //  setUser(data)
    //})
  }, []);
    return (
        <>
        <Navbar/>
        <main>
            <Outlet/>

        </main>
            <Footer/>

        </>
    );
};

export default Layout;