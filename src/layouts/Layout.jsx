import React from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "@/compenment/Navbar/Navbar.jsx";
import NavbarTourist from "@/compenment/NavbarTourist/NavbarTourist.jsx";
import NavbarGuide from "@/compenment/NavbarGuide/NavbarGuide.jsx";
import Footer from '../../src/compenment/Footer/Footer.jsx'

const Layout = () => {
    if (window.localStorage.getItem('ACCESS_TOKEN')) {
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

	} else {
		return (
        <>
        <Navbar/>
        <main>
            <Outlet/>

        </main>
            <Footer/>

        </>
    );
		
	}
};

export default Layout;